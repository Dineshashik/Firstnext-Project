import Navbar from '@/components/common/navbar';
import { INVESTOR } from '@/helpers/constants';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  
  return <Navbar type={INVESTOR}>{children}</Navbar>;
}
