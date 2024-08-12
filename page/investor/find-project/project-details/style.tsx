import { styled, Box, Stack, Button } from '@mui/material';
import Image from 'next/image';

const FindProjectDetailsWrapper = styled(Box)(({ theme }) => ({
  margin: '36px',
  [theme.breakpoints.down('md')]: {
    margin: '16px',
  },
}));

const FindProjectConnectButton = styled(Button)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  width: '100%',
  textTransform: 'none',
  borderRadius: '100px',
  fontSize: '16px',
  fontWeight: '600',
  padding: '14px 0px',
  height: '48px',
}));

const FindProjectViewProfileButton = styled(FindProjectConnectButton)(
  ({ theme }) => ({
    color: '#0A2540',
  })
);

export {
  FindProjectDetailsWrapper,
  FindProjectConnectButton,
  FindProjectViewProfileButton,
};
