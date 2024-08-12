'use client';
import { Box, Button, Stack, styled } from '@mui/material';

const FounderDetailsPageWrapper = styled(Box)(({ theme }) => ({
  margin: '36px',

  [theme.breakpoints.down('md')]: {
    margin: '16px',
  },
}));

const FounderDetailsConnectButton = styled(Button)(({ theme }) => ({
  borderRadius: '100px',
  padding: '14px 48px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  height: '48px',
}));

export { FounderDetailsConnectButton, FounderDetailsPageWrapper };
