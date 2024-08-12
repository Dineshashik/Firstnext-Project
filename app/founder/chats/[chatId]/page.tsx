'use client';
import ChatDetailsPage from '@/page/founder/chats/chat-details';

const ChatDetails = ({ params }: { params: { chatId: string } }) => {
  return (
    <ChatDetailsPage
      key={params.chatId}
      chatId={params.chatId}
    />
  );
};

export default ChatDetails;
