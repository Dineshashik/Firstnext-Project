'use client';
import { CardWrapper } from '@/components/common/ui';
import { Box, Tab, Theme, styled } from '@mui/material';

const FounderSignupPageWrapper = styled(Box)(({ theme }) => ({
  padding: '36px',
  backgroundColor: '#DEEAF6',
  minHeight: 'calc(100vh - 144px)',
  [theme.breakpoints.down('md')]: {
    padding: '16px 0px',
  },
}));

// const FounderSignupCardTab = styled(Tab)(
//   ({ theme, isActive }: { theme: Theme; isActive: boolean }) => ({
//     textTransform: 'none',
//     alignItems: 'flex-start',
//     paddingLeft: '36px',
//     [theme.breakpoints.down('md')]: {
//       paddingLeft: '10px',
//     },
//     backgroundColor: isActive ? 'red' : 'inherit', // Change the color here
//   })
// );

const FounderSignupCardTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  alignItems: 'flex-start',
  paddingLeft: '36px',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '10px',
  },
}));

const FounderApprovalCardWrapper = styled(CardWrapper)(({ theme }) => ({
  minHeight: 'calc(100vh - 187px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export {
  FounderSignupPageWrapper,
  FounderSignupCardTab,
  FounderApprovalCardWrapper,
};
