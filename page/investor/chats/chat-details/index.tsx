'use client';
import Chatbox from '@/components/chats/chatbox';
import { INVESTOR } from '@/helpers/constants';
import React from 'react';

const InvestorChatDetailsPage = ({ chatId }: { chatId: string }) => {
  return <Chatbox chatId={chatId} type={INVESTOR}/>;
};

export default InvestorChatDetailsPage;
