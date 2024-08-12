'use client';
import { CardWrapper } from '@/components/common/ui';
import { Box, Tab, styled } from '@mui/material';

const InvestorSignupPageWrapper = styled(Box)(({ theme }) => ({
  padding: '36px',
  backgroundColor: '#DEEAF6',
  minHeight: 'calc(100vh - 144px)',
  [theme.breakpoints.down('md')]: {
    padding: '16px 0px',
  },
}));

const InvestorSignupCardTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  alignItems: 'flex-start',
  paddingLeft: '36px',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '10px',
  },
}));

const ApprovalCardWrapper = styled(CardWrapper)(({ theme }) => ({
  minHeight: 'calc(100vh - 187px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export {
  InvestorSignupCardTab,
  InvestorSignupPageWrapper,
  ApprovalCardWrapper,
};
