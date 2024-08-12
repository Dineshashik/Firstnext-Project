'use client';
import { Box, styled, Stack, Button } from '@mui/material';

const DashboardWrapper = styled(Box)(({ theme }) => ({
  padding: '36px',
  [theme.breakpoints.down('md')]: {
    padding: '16px',
  },
}));

const AcationButtonModal = styled(Stack)(() => ({
  position: 'absolute',
  bottom: 0,
  right: '50%',
  background: 'white',
  width: '150px',
  zIndex: 2,
  padding: '8px',
  boxShadow: '4px 8px 16px 0px #635BFF33',
  borderRadius: '14px',
}));

const IgnoreButton = styled(Button)(() => ({
  border: '1px solid #DEEAF6',
  borderRadius: '10px',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 600,
}));

export { DashboardWrapper, AcationButtonModal, IgnoreButton };
