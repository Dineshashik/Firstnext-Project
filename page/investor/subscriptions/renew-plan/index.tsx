'use client';
import { CardWrapper } from '@/components/common/ui';
import React from 'react';
import { RenewPageWrapper } from './style';
import PricingRenewPlanCard from '@/components/common/pricing-renew-plan';

const RenewPlanPage = () => {
  return (
    <RenewPageWrapper>
      <PricingRenewPlanCard />
    </RenewPageWrapper>
  );
};

export default RenewPlanPage;
