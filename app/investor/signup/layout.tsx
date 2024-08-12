import SignupNavbar from '@/components/common/signup-navbar';
import { Box } from '@mui/material';

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignupNavbar type="investor" />
      {children}
    </>
  );
}
