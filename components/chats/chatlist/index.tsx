'use client';
import { CardWrapper } from '@/components/common/ui';
import {
  ChatListInput,
  ChatListInputWrapper,
  ChatListTilesWrapper,
  ChatListWrapper,
} from './style';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { useSocket } from '@/context/SocketContext';
import { user } from '@/lib/slices/userSlice';
import { getThreads } from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import extractTime from '@/utils/extrectTime';
import { messagesData } from '@/helpers/messagesData';
import useDebouncedValue from '@/utils/useDebounced';

const ChatList = ({ type }: { type: 'investor' | 'founder' }) => {
  const route = useRouter();
  const { socket } = useSocket();
  const userDetails: any = useAppSelector(user);
  const [searchValue, setSearchValue] = useState<string>('');

  const [chatList, setChatList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedSearchTerm = useDebouncedValue(searchValue, 700);
  async function fetchChatList() {
    try {
      setIsLoading(true);
      const res: any = await api.get(getThreads, {
        search: debouncedSearchTerm,
      });
      if (res.success) {
        setIsLoading(false);
        setChatList(res.data);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  }

  useEffect(() => {
    if (userDetails?.subPlan === 'PREMIUM') {
      fetchChatList();
    }
  }, [userDetails?.subPlan, debouncedSearchTerm]);

  useEffect(() => {
    const handleReceiveMsg = () => {
      fetchChatList();
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
      socket?.on('receive_message', handleReceiveMsg);
      socket.on('message_seen_received', handleMessageSeenReceived);
    }
    return () => {
      if (socket) {
        socket.off('receive_message', handleReceiveMsg);
        socket.off('message_seen_received', handleMessageSeenReceived);
      }
    };
  }, [socket, userDetails]);

  return (
    <ChatListWrapper
      sx={{
        filter:userDetails?.role == "INVESTOR" ? "none" :  userDetails?.subPlan === 'PREMIUM' ? 'normal' : 'blur(6px)',
      }}
    >
      <ChatListInputWrapper
        direction="row"
        justifyContent="space-between"
      >
        <ChatListInput
          type="text"
          id="search"
          name="search"
          placeholder="What are you looking for ?"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue ? (
          <CloseIcon
            onClick={(e) => setSearchValue('')}
            sx={{ cursor: 'pointer' }}
          />
        ) : (
          <SearchIcon />
        )}
      </ChatListInputWrapper>
      <Box
        mt={1}
        overflow="auto"
        maxHeight="calc(100vh - 247px)"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {isLoading && <CircularProgress sx={{ marginTop: '10px' }} />}
        </Box>
        {userDetails?.subPlan === 'PREMIUM' && !isLoading && (
          <>
            {chatList.length > 0 ? (
              chatList.map((item: any) => (
                <ChatListTilesWrapper
                  direction="row"
                  justifyContent="space-between"
                  key={item._id}
                  p={2}
                  onClick={(e) => {
                    route.push(`/${type}/chats/${item?._id}`);
                    socket?.emit('message_seen', {
                      roomId: item?._id,
                      loggedInUser: item?.loggedInUser._id,
                      otherUser: item?.otherUser._id,
                    });
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <Avatar
                      alt="profile"
                      src={item?.otherUser?.profile?.image_url}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        mt={1}
                      >
                        {item?.otherUser?.first_name}{' '}
                        {item?.otherUser?.last_name} {item.sender}
                        {!item?.last_message?.seen &&
                          item?.last_message?.sender !== userDetails?._id && (
                            <Badge
                              color="error"
                              overlap="circular"
                              badgeContent=" "
                              variant="dot"
                              sx={{ marginLeft: '8px' }}
                            />
                          )}
                      </Typography>

                      {item?.last_message && (
                        <Typography
                          variant="body2"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 1, // Limiting to 1 line
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {item?.last_message?.message_type.split('/')[0] ===
                          'image'
                            ? 'image'
                            : item?.last_message?.message_type?.split(
                                '/'
                              )[0] === 'application'
                            ? 'Document'
                            : item?.last_message?.message}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                  {item.last_message && (
                    <Typography
                      variant="body2"
                      fontSize={12}
                    >
                      {extractTime(item?.last_message?.created_at) || ''}
                    </Typography>
                  )}
                </ChatListTilesWrapper>
              ))
            ) : (
              <Typography
                variant="h4"
                textAlign="center"
                mt={3}
              >
                No chats available
              </Typography>
            )}
          </>
        )}

        {userDetails?.subPlan === 'FREE' && !isLoading && (
          <>
            {messagesData?.map((item: any) => (
              <ChatListTilesWrapper
                direction="row"
                justifyContent="space-between"
                key={item._id}
                p={2}
                onClick={(e) => {
                  route.push(`/${type}/chats/${item?._id}`);
                  socket?.emit('message_seen', {
                    roomId: item?._id,
                    loggedInUser: item?.loggedInUser._id,
                    otherUser: item?.otherUser._id,
                  });
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Avatar
                    alt="profile"
                    src={item?.otherUser?.profile?.image_url}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      mt={1}
                    >
                      {item.otherUser.first_name} {item.otherUser.last_name}{' '}
                      {item.sender}
                      {!item.last_message.seen &&
                        item.last_message.sender !== userDetails?._id && (
                          <Badge
                            color="error"
                            overlap="circular"
                            badgeContent=" "
                            variant="dot"
                            sx={{ marginLeft: '8px' }}
                          />
                        )}
                    </Typography>

                    {item?.last_message && (
                      <Typography
                        variant="body2"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {item?.last_message?.message_type.split('/')[0] ===
                        'image'
                          ? 'image'
                          : item?.last_message?.message_type?.split('/')[0] ===
                            'application'
                          ? 'Document'
                          : item?.last_message?.message}
                      </Typography>
                    )}
                  </Box>
                </Stack>
                {item?.last_message && (
                  <Typography
                    variant="body2"
                    fontSize={12}
                  >
                    {extractTime(item?.last_message?.created_at) || ''}
                  </Typography>
                )}
              </ChatListTilesWrapper>
            ))}
          </>
        )}
      </Box>
    </ChatListWrapper>
  );
};

export default ChatList;
