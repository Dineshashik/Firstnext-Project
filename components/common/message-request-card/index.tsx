import React from 'react';
import { TitleButtonBoxWrapper } from '../ui';
import { Avatar, Badge, Box, Button, Stack, Typography } from '@mui/material';
import {
  MessageDetailsTextWrapper,
  MsgTilesWrapper,
  TilesButtonWrapper,
} from './style';
import CheckIcon from '@mui/icons-material/Check';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/context/SocketContext';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { FOUNDER, INVESTOR } from '@/helpers/constants';

interface MessageCard {
  cardType: 'message' | 'notification';
  height?: string;
  data?: any;
  type?: 'investor' | 'founder';
  isBlurred?: boolean;
}

interface RequestCard {
  cardType: 'request';
  height?: string;
  data?: any;
  onAccept: (index: string) => void;
  onIgnore: (index: string) => void;
  isBlurred?: boolean;
}

const MessageRequestCard: React.FC<MessageCard | RequestCard> = (props) => {
  const { cardType, height, data } = props;
  const { onAccept, onIgnore } = props as RequestCard;
  const { type } = props as MessageCard;
  const userDetails: any = useAppSelector(user);
  const { socket } = useSocket();
  const route = useRouter();

  const handleNotificationRedirect = (type: string, obj_id: string) => {
    if (type === 'MESSAGE') {
      route.push(`/${userDetails.role.toLowerCase()}/chats/${obj_id}`);
    }
    if (type === 'DOCUMENT') {
      route.push(`/founder/project-management`);
    }
    if (type === 'CONNECTION') {
      if (userDetails.role.toLowerCase() === FOUNDER) {
        route.push(`/${userDetails.role.toLowerCase()}/investors`);
      }
      if (userDetails.role.toLowerCase() === INVESTOR) {
        route.push(`/${userDetails.role.toLowerCase()}/founder`);
      }
    }
    if (type === 'DOCUMENT_GRANT') {
      route.push(`/${userDetails.role.toLowerCase()}/find-project/${obj_id}`);
    }
  };

  return (
    <Box
      sx={{
        height: height,
        overflow: 'auto',
        filter: props?.isBlurred ? 'blur(7px)' : 'none',
      }}
    >
      {cardType === 'message' &&
        data.map((item: any, index: number) => (
          <MsgTilesWrapper
            direction="row"
            key={item._id}
            index={index}
            onClick={(e) => {
              if (!props?.isBlurred) {
                route.push(`/${type}/chats/${item?._id}`);
                socket?.emit('message_seen', {
                  roomId: item?._id,
                  loggedInUser: item?.loggedInUser._id,
                  otherUser: item?.otherUser._id,
                });
              }
            }}
          >
            <Avatar
              alt="profile"
              src={item?.otherUser?.profile?.image_url}
            />
            <Box ml={1}>
              <Typography
                variant="h6"
                fontSize={14}
              >
                {item?.otherUser?.first_name} {item?.otherUser?.last_name}{' '}
                {item.sender}
                {!item.last_message?.seen &&
                  item.last_message?.sender !== userDetails?._id && (
                    <Badge
                      color="error"
                      overlap="circular"
                      badgeContent=" "
                      variant="dot"
                      sx={{ marginLeft: '8px' }}
                    />
                  )}
              </Typography>
              {/* {item.last_message && (
                <Typography variant="body2">
                  {item.last_message?.message_type.split('/')[0] === 'image'
                    ? 'image'
                    : item.last_message?.message_type?.split('/')[0] ===
                      'application'
                    ? 'Document'
                    : item.last_message?.message}
                </Typography>
              )} */}
              <MessageDetailsTextWrapper
                variant="body2"
                m={0}
              >
                {item?.last_message &&
                  (item?.last_message?.message_type.split('/')[0] === 'image'
                    ? 'image'
                    : item?.last_message?.message_type?.split('/')[0] ===
                      'application'
                    ? 'Document'
                    : item.last_message?.message)}
              </MessageDetailsTextWrapper>
            </Box>
          </MsgTilesWrapper>
        ))}
      {cardType === 'request' &&
        data?.map((item: any, index: number) => (
          <MsgTilesWrapper
            direction="row"
            key={item?._id}
            index={index}
            minWidth="452px"
          >
            <Avatar>{item?.user?.first_name?.[0] ?? ''}</Avatar>
            <Stack
              direction="row"
              justifyContent="space-between"
              width="100%"
            >
              <Box ml={1}>
                <Typography
                  variant="h6"
                  fontSize={14}
                >
                  {item?.user?.first_name + ' ' + item?.user?.last_name}
                </Typography>
                <Typography
                  variant="body2"
                  m={0}
                  pt="4px"
                >
                  {item?.user?.country}
                </Typography>
              </Box>
              <Stack
                direction="row"
                ml={1}
                spacing={1}
              >
                <TilesButtonWrapper
                  onClick={() => onAccept(item?.user?._id)}
                  startIcon={<CheckIcon />}
                >
                  Accept
                </TilesButtonWrapper>
                <TilesButtonWrapper
                  onClick={() => onIgnore(item?.user?._id)}
                  color="error"
                >
                  Ignore
                </TilesButtonWrapper>
              </Stack>
            </Stack>
          </MsgTilesWrapper>
        ))}
      {cardType === 'notification' &&
        data?.map((item: any, index: number) => (
          <MsgTilesWrapper
            direction="row"
            key={item?._id}
            index={index}
            onClick={() => handleNotificationRedirect(item.type, item?.obj_id)}
          >
            <Avatar
              alt="profile"
              src={item?.sender_id?.profile?.image_url}
            />
            <Box ml={1}>
              <Typography
                variant="h6"
                fontSize={14}
              >
                {item?.title}
              </Typography>
              <MessageDetailsTextWrapper
                variant="body2"
                m={0}
              >
                {item?.description}
              </MessageDetailsTextWrapper>
              <MessageDetailsTextWrapper
                variant="body2"
                m={0}
              >
                {getTimeAgo(item?.created_at)}
              </MessageDetailsTextWrapper>
            </Box>
          </MsgTilesWrapper>
        ))}
    </Box>
  );
};

export default MessageRequestCard;
