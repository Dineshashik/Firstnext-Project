import AdminFounderPage from '@/page/admin/founders';
import { Suspense } from 'react';

const AdminFounder = () => {
  return (
    <Suspense>
      <AdminFounderPage />
    </Suspense>
  );
};

export default AdminFounder;
