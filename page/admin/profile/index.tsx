import React from 'react';
import { AdminProfileWrapper } from './style';
import DynamicTabs from '@/components/common/custom-tab';
import AdminProfileDetailsTab from '@/components/admin-profile/profile-details';
import AdminChangePasswordTab from '@/components/admin-profile/change-password';

const AdminProfilePage = () => {
  const tabs = [
    {
      name: 'Profile Details',
      content: <AdminProfileDetailsTab />,
    },
    {
      name: 'Change Password',
      content: <AdminChangePasswordTab />,
    },
  ];
  return (
    <AdminProfileWrapper>
      <DynamicTabs tabs={tabs} />
    </AdminProfileWrapper>
  );
};

export default AdminProfilePage;
