'use client';
import { Box, Button, Stack, styled } from '@mui/material';

const InvestorDetailsPageWrapper = styled(Box)(({ theme }) => ({
  margin: '36px',

  [theme.breakpoints.down('md')]: {
    margin: '16px',
  },
}));

const InvestorDetailsConnectButton = styled(Button)(({ theme }) => ({
  borderRadius: '100px',
  padding: '14px 36px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  maxHeight: '44px',
}));

export { InvestorDetailsConnectButton, InvestorDetailsPageWrapper };
