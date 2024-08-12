'use client';
import React from 'react';
import { AdminSubscriptionsWrapper } from './style';
import { Typography } from '@mui/material';
import DynamicTabs from '@/components/common/custom-tab';

import AdminSubsFreeTab from '@/components/admin-subscriptions/free';
import AdminSubsPremiumTab from '@/components/admin-subscriptions/premium';

const AdminSubscriptionsPage = () => {
  const tabs = [
    {
      name: 'Free',
      content: <AdminSubsFreeTab />,
    },
    {
      name: 'Premium',
      content: <AdminSubsPremiumTab />,
    },
  ];
  return (
    <AdminSubscriptionsWrapper>
      <Typography
        variant="h4"
        mb={2}
      >
        Subscriptions
      </Typography>
      <DynamicTabs tabs={tabs} />
    </AdminSubscriptionsWrapper>
  );
};

export default AdminSubscriptionsPage;
