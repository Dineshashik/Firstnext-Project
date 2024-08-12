import {
  Avatar,
  Box,
  Button,
  Divider,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import {
  ChatBoxBody,
  ChatBoxFooter,
  ChatBoxHeader,
  ChatBoxInputWrapper,
  ChatBoxMsgInput,
  BackButton,
  AttachmentWrapper,
} from './style';
import Message from '../message';
import Image from 'next/image';
import { CardWrapper, CustomButton } from '@/components/common/ui';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/context/SocketContext';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { getMessages, getThreads, uploadDoc } from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';

const Chatbox = ({
  chatId,
  type,
}: {
  chatId: string;
  type: 'founder' | 'investor';
}) => {
  const route = useRouter();
  const { socket } = useSocket();
  const userDetails: any = useAppSelector(user);
  const [chatList, setChatList] = useState<any>([]);
  const [roomDetails, setRoomDetails] = useState<any>();
  const { register, handleSubmit, reset, setValue, watch } = useForm<any>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [attachment, setAttachment] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchMsgList = useCallback(async () => {
    try {
      const res: any = await api.get(`${getMessages}/${chatId}`);
      if (res.success) {
        setChatList(res.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  }, [chatId]);

  const fetchThreadById = useCallback(async () => {
    try {
      const res: any = await api.get(`${getThreads}`, {
        thread_id: chatId,
      });
      if (res.success) {
        setRoomDetails(res.data[0]);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  }, [chatId]);

  useEffect(() => {
    const handleReceiveMessage = (newMsg: any) => {
      if (newMsg.chat_room_id === chatId) {
        setChatList((prevChatList: any) => [...prevChatList, newMsg]);
        if (newMsg.receiver === userDetails._id && roomDetails) {
          socket?.emit('message_seen', {
            roomId: chatId,
            loggedInUser: roomDetails?.loggedInUser?._id,
            otherUser: roomDetails?.otherUser?._id,
          });
        }
      }
    };

    const handleMessageSeenReceived = (newMsg: any) => {
      setChatList((prevChats: any) => {
        const updatedChatList = structuredClone(prevChats);
        const lastChat = updatedChatList.length - 1;
        updatedChatList[lastChat].seen = true;
        return updatedChatList;
      });
    };

    if (socket && userDetails) {
      socket.on('receive_message', handleReceiveMessage);
      socket.on('message_seen_received', handleMessageSeenReceived);
    }

    return () => {
      if (socket) {
        socket.off('receive_message', handleReceiveMessage);
        socket.off('message_seen_received', handleMessageSeenReceived);
      }
    };
  }, [chatId, chatList, roomDetails, socket, userDetails]);

  useEffect(() => {
    if (socket && userDetails) {
      socket.emit('join_room', userDetails._id);
    }

    fetchMsgList();
    fetchThreadById();
  }, [userDetails, socket, fetchMsgList, fetchThreadById, chatId]);

  const onSubmit = async (data: { text: string; attachments: File }) => {
    if (data.attachments) {
      const formData = new FormData();
      formData.append('file', data.attachments);
      try {
        setIsLoading(true);
        const res: any = await api.post(
          uploadDoc,
          formData,
          'multipart/form-data'
        );

        if (res.success && socket && res.data && userDetails && chatId) {
          setIsLoading(false);
          socket.emit('send_message', {
            chat_room_id: chatId,
            sender: userDetails._id,
            message: res.data?.url,
            seen: false,
            message_type: res.data?.type,
            file_name: res.data?.file_name,
          });
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.response.data.message || 'Something went wrong');
      }
    }
    if (data.text !== '' && socket && userDetails && chatId) {
      socket.emit('send_message', {
        chat_room_id: chatId,
        sender: userDetails?._id,
        message: data.text,
        seen: false,
        message_type: 'text',
      });
    }
    setAttachment(null);
    reset();
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setValue('attachments', files[0]);
      setAttachment(files[0]?.name);
    }
  };

  const handleRemoveAttachment = () => {
    setValue('attachments', null);
    setAttachment(null);
  };

  const bottomRef: any = useRef();

  useLayoutEffect(() => {
    if (bottomRef?.current) {
      bottomRef?.current?.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  }, [chatList]);

  return (
    <Stack
      justifyContent="space-between"
      height="100%"
    >
      <ChatBoxHeader
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Avatar
            alt="profile"
            src={roomDetails?.otherUser?.profile?.image_url}
          />
          <Box>
            <Typography variant="h6">
              {roomDetails?.otherUser?.first_name}{' '}
              {roomDetails?.otherUser?.last_name}
            </Typography>
            {/* <Typography variant="body2">Last online 3 min ago</Typography> */}
          </Box>
        </Stack>
        <BackButton
          onClick={() => {
            route.push(`/${type}/chats`);
          }}
          variant="text"
          startIcon={<KeyboardArrowLeftIcon />}
        >
          Back
        </BackButton>
      </ChatBoxHeader>
      <Box>
        <ChatBoxBody>
          {chatList.length > 0 &&
            chatList.map((item: any, index: number) => {
              return (
                <Message
                  key={item._id}
                  message={item}
                  isSender={item.sender === userDetails?._id}
                  senderAvatar={roomDetails?.loggedInUser?.profile?.image_url}
                  receiverAvatar={roomDetails?.otherUser?.profile?.image_url}
                  isLastMessage={index === chatList.length - 1}
                />
              );
            })}
          <div ref={bottomRef} />
        </ChatBoxBody>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ position: 'sticky', bottom: 0 }}
        >
          <ChatBoxFooter>
            <ChatBoxInputWrapper>
              {attachment && (
                <Stack direction="row">
                  <AttachmentWrapper
                    variant="h6"
                    mr={1}
                  >
                    {attachment}
                  </AttachmentWrapper>
                  <CloseIcon
                    onClick={handleRemoveAttachment}
                    style={{ cursor: 'pointer' }}
                  />
                </Stack>
              )}
              {!attachment && (
                <ChatBoxMsgInput
                  type="text"
                  {...register('text')}
                />
              )}
              <Image
                src="/asset/icon/attachment.svg"
                alt="attachment"
                width={20}
                height={20}
                style={{ cursor: 'pointer' }}
                onClick={handleImageClick}
              />
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                ref={fileInputRef}
                accept=".pdf,.doc,.docx,.txt,image/*"
              />
            </ChatBoxInputWrapper>
            <CustomButton
              color="blue"
              icon="default"
              lgWidth="15%"
              xsWidth="100%"
              mdWidth="20%"
              type="submit"
              isLoading={isLoading}
              loadingText="Sending.."
            >
              Send
            </CustomButton>
          </ChatBoxFooter>
        </form>
      </Box>
    </Stack>
  );
};

export default Chatbox;
