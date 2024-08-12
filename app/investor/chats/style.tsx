'use client';
import { CardWrapper } from '@/components/common/ui';
import { Box, styled, Stack, Button, Grid } from '@mui/material';

const ChatPageWrapper = styled(Box)(({ theme }) => ({
  padding: '36px',
  height: 'calc(100vh - 80px)',
  [theme.breakpoints.down('md')]: {
    padding: '16px',
  },
}));

const ChatCardWrapper = styled(CardWrapper)(({ theme }) => ({
  height: '100%',
  padding: '16px',
}));

const GridWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: '12px 8px',
  },
}));

export { ChatPageWrapper, GridWrapper, ChatCardWrapper };
