import Navbar from '@/components/common/navbar';
import { FOUNDER } from '@/helpers/constants';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Navbar type={FOUNDER}>{children}</Navbar>;
}
