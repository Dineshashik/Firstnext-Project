import InvestorDetailsPage from '@/page/founder/investors/investors-details';

const InvestorDetails = ({ params }: { params: { investorsId: string } }) => {
  return <InvestorDetailsPage investorId={params.investorsId} />;
};

export default InvestorDetails;
