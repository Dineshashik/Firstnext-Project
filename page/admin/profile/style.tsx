'use client';
import { Box, Button, Stack, Typography, styled } from '@mui/material';

const AdminProfileWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  margin: '36px',
  padding: '24px',
  borderRadius: '24px',

  [theme.breakpoints.down('md')]: {
    margin: '16px',
    padding: '16px',
  },
  [theme.breakpoints.up('lg')]: {
    height: 'calc(100vh - 152px)',
  },
}));

export { AdminProfileWrapper };
