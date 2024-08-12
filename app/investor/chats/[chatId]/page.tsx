import InvestorChatDetailsPage from '@/page/investor/chats/chat-details';

const InvestorChatDetails = ({ params }: { params: { chatId: string } }) => {
  return <InvestorChatDetailsPage chatId={params.chatId} />;
};

export default InvestorChatDetails;
