import FounderSignupPage from '@/page/founder/signup';

type TabKeys = 'DETAILS' | 'COMPANY' | 'OTHER' | 'PRICE' | 'ADMIN';
const FounderSignup = ({
  searchParams,
}: {
  searchParams: {
    tab: TabKeys;
  };
}) => {
  return <FounderSignupPage tab={searchParams && searchParams?.tab} />;
};

export default FounderSignup;
