'use client';
import { Box, styled } from '@mui/material';

const AddProjectDetailsWrapper = styled(Box)(({ theme }) => ({
  margin: '36px',
  [theme.breakpoints.down('md')]: {
    margin: '16px',
  },
}));

export { AddProjectDetailsWrapper };
