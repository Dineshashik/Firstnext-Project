'use client';
import { Box, styled } from '@mui/material';

const AdminSubscriptionsWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  margin: '36px',
  padding: '24px',
  borderRadius: '24px',

  [theme.breakpoints.down('md')]: {
    margin: '16px',
    padding: '16px',
  },
}));

export { AdminSubscriptionsWrapper };
