'use client';
import { Stack, Typography } from '@mui/material';
import React from 'react';

const ChatPage = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography variant="h4">Continue Your Chat Conversations</Typography>
      {/* <Typography align='center'>It looks like you're not connected with anyone at the moment. Please connect with a Investor to start chatting!</Typography> */}
    </Stack>
  );
};

export default ChatPage;
