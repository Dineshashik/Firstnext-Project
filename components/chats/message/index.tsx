import React from 'react';
import { MessageWrapper, MessageBubble } from './style';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { MessageImageWrapper } from '../chatbox/style';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import extractTime from '@/utils/extrectTime';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

interface MessageProps {
  message: any;
  isSender: boolean;
  senderAvatar: string;
  receiverAvatar: string;
  isLastMessage: boolean;
}

const Message: React.FC<MessageProps> = ({
  message,
  isSender,
  senderAvatar,
  receiverAvatar,
  isLastMessage,
}) => {
  const theme = useTheme();
  return (
    <MessageWrapper issender={isSender.toString()}>
      {isSender ? (
        <Avatar
          alt="sender"
          src={senderAvatar}
        />
      ) : (
        <Avatar
          alt="receiver"
          src={receiverAvatar}
        />
      )}
      <Box>
        {message?.message_type?.split('/')[0] === 'image' ? (
          <MessageImageWrapper
            ml={isSender ? 0 : 1}
            mr={isSender ? 1 : 0}
          >
            <Image
              src={message.message}
              width={150}
              height={100}
              alt="image"
              style={{ borderRadius: '8px', cursor: 'pointer' }}
              onClick={() => window.open(message.message, '_blank')}
            />
          </MessageImageWrapper>
        ) : message?.message_type?.split('/')[0] === 'application' ? (
          <MessageImageWrapper
            ml={isSender ? 0 : 1}
            mr={isSender ? 1 : 0}
          >
            <Stack
              direction="row"
              onClick={() =>
                window.open(
                  `https://docs.google.com/viewer?url=${message.message}`,
                  '_blank'
                )
              }
              p={1}
              spacing={1}
              alignItems="center"
              sx={{
                backgroundColor: 'white',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <ArticleOutlinedIcon />
              <Typography>{message.file_name}</Typography>
            </Stack>
          </MessageImageWrapper>
        ) : (
          <MessageBubble
            issender={isSender.toString()}
            theme={theme}
          >
            <Typography
              variant="body2"
              m={0}
            >
              {message.message}
            </Typography>
          </MessageBubble>
        )}

        <Typography
          variant="body2"
          fontSize={12}
          my={0}
          ml={isSender ? 0 : 2}
          mr={isSender ? 2 : 0}
          align={isSender ? 'right' : 'left'}
          sx={{ display: 'flex', direction: 'row' }}
        >
          {extractTime(message.created_at)}
          {isSender && isLastMessage && message?.seen && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px',
              }}
            >
              {' '}
              seen
              <RemoveRedEyeOutlinedIcon
                sx={{ fontSize: '12px', marginLeft: '4px' }}
              />
            </span>
          )}
        </Typography>
      </Box>
    </MessageWrapper>
  );
};

export default Message;
