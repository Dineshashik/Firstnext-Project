import AdminInvestorPage from '@/page/admin/investors';
import { Suspense } from 'react';

const AdminInvestor = () => {
  return (
    <Suspense>
      <AdminInvestorPage />
    </Suspense>
  );
};

export default AdminInvestor;
