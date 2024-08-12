'use client';
import { Box, styled, Stack, Button, Grid } from '@mui/material';

const ChatPageWrapper = styled(Box)(({ theme }) => ({
  padding: '36px',
  [theme.breakpoints.down('md')]: {
    padding: '16px',
  },
}));

const GridWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: '12px 8px',
    display: 'none',
  },
}));

export { ChatPageWrapper, GridWrapper };
