'use client';
import { CardWrapper } from '@/components/common/ui';
import { Box, styled } from '@mui/material';

const RenewPageWrapper = styled(CardWrapper)(({ theme }) => ({
  margin: '36px',

  [theme.breakpoints.down('md')]: {
    margin: '16px',
  },
}));

export { RenewPageWrapper };
