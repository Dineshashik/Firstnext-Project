'use client';

import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';

import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { useSocket } from '@/context/SocketContext';

const InvestorChatPage = () => {
  const { socket } = useSocket();
  const userDetails: any = useAppSelector(user);
  if (socket && userDetails) {
    socket.emit('user_online', userDetails._id);
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography variant="h4">Continue Your Chat Conversations</Typography>
      {/* <Typography align='center'>It looks like you're not connected with anyone at the moment. Please connect with a Founder to start chatting!</Typography> */}
    </Stack>
  );
};

export default InvestorChatPage;
