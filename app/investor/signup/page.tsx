import InvestorSignupPage from '@/page/investor/signup';
type TabKeys = 'DETAILS' | 'COMPANY' | 'OTHER' | 'PRICE' | 'ADMIN';
const InvestorSignup = ({
  searchParams,
}: {
  searchParams: {
    tab: TabKeys;
  };
}) => {
  return <InvestorSignupPage tab={searchParams && searchParams?.tab} />;
};

export default InvestorSignup;
