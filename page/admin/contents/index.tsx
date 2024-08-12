'use client';
import React from 'react';
import { AdminContentsWrapper } from './style';
import { Typography } from '@mui/material';
import DynamicTabs from '@/components/common/custom-tab';
import HeroSectionTab from '@/components/admin-contents/hero-section';
import FeaturesInTab from '@/components/admin-contents/features-in';
import NewApproachTab from '@/components/admin-contents/new-approach';
import LivePlatformTab from '@/components/admin-contents/live-platform';
import VibrantGrowingTab from '@/components/admin-contents/vibrant-growing';
import FooterTab from '@/components/admin-contents/footer';

const AdminContentsPage = () => {
  const tabs = [
    {
      name: 'Hero Section',
      content: <HeroSectionTab />,
    },
    // {
    //   name: 'Featured In',
    //   content: <FeaturesInTab />,
    // },
    {
      name: 'A New Approach',
      content: <NewApproachTab />,
    },
    {
      name: 'Let\'s Connect\u0027s Live Platform',
      content: <LivePlatformTab />,
    },
    {
      name: 'Join a vibrant Growing',
      content: <VibrantGrowingTab />,
    },
    {
      name: 'Footer',
      content: <FooterTab />,
    },
  ];
  return (
    <AdminContentsWrapper>
      <Typography
        variant="h4"
        mb={2}
      >
        Contents
      </Typography>
      <DynamicTabs tabs={tabs} />
    </AdminContentsWrapper>
  );
};

export default AdminContentsPage;
