'use client';
import { Box, Grid, styled } from '@mui/material';

const ChatDetailsPageWrapper = styled(Box)(({ theme }) => ({
  margin: '36px',

  borderRadius: '24px',
  backgroundColor: theme.palette.info.light,
  [theme.breakpoints.down('md')]: {
    margin: '16px',
  },
}));
const GridWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: '12px 8px',
    display: 'none',
  },
}));

export { ChatDetailsPageWrapper, GridWrapper };
