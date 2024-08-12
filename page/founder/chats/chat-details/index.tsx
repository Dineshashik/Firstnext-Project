'use client';
import Chatbox from '@/components/chats/chatbox';
import React from 'react';
import { FOUNDER } from '@/helpers/constants';

const ChatDetailsPage = ({ chatId }: { chatId: string }) => {
  return (
    <Chatbox
      chatId={chatId}
      type={FOUNDER}
    />
  );
};

export default ChatDetailsPage;
