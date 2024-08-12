import Navbar from '@/components/common/navbar';
import { ADMIN } from '@/helpers/constants';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Navbar type={ADMIN}>{children}</Navbar>;
}
