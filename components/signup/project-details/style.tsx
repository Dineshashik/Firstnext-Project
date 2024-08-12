'use client';
import { CardWrapper } from '@/components/common/ui';
import { Box, Button, styled } from '@mui/material';

const SignupProjectCardWrapper = styled(CardWrapper)(({ theme }) => ({
  minHeight: 'calc(100vh - 194px)',
}));

const SkipButton = styled(Button)(({ theme }) => ({
  padding: '15px 48px',
  textTransform: 'none',
  color: '#425466',
  backgroundColor: '#F6F9FC',
  borderRadius: '100px',
  fontWeight: '600',
  height: '48px',

  [theme.breakpoints.down('md')]: {
    height: '35px',
  },
}));

export { SignupProjectCardWrapper, SkipButton };
