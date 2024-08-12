import FounderDetailsPage from '@/page/investor/founder/founder-details';

const FounderDetails = ({ params }: { params: {founderId: string } }) => {
  return <FounderDetailsPage founderId={params?.founderId} />;
};

export default FounderDetails;
