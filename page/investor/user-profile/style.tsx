'use client';
import { styled, Box, Tab, Stack, Button } from '@mui/material';

const InvestorUserProfilePageWrapper = styled(Box)(({ theme }) => ({
  margin: '36px',

  [theme.breakpoints.down('md')]: {
    margin: '16px',
  },
}));

const TabsCardWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  borderRadius: '24px',
  padding: '24px 0px',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const CardTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  alignItems: 'flex-start',
  paddingLeft: '36px',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '10px',
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  color: '#0A2540',
  borderRadius: '100px',
  border: '1px solid #DEEAF6',
  textTransform: 'none',
  padding: '14px',
  margin: '0px 36px',

  [theme.breakpoints.down('md')]: {
    padding: '8px',
    marginBottom: '16px',
    marginTop: '8px',
    display: 'none',
  },
}));

export { InvestorUserProfilePageWrapper, TabsCardWrapper, CardTab, LogoutButton };
