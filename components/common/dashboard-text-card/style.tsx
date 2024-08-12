'use client';
import { styled, Box, Typography } from '@mui/material';

const DashboardTextCardWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  background: 'linear-gradient(180deg, #DEEAF6 50%, #FFFFFF 100%)',
  boxShadow: '4px 8px 16px 0px #635BFF1A',
  border: '2px solid #FFFFFF',
  padding: '1.5rem',
  borderRadius: '24px',
  position: 'relative',
  minHeight: '214px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}));

const UpgradeTextWrapper = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginRight: '12px',
  textAlign: 'end',
}));
export { DashboardTextCardWrapper, UpgradeTextWrapper };
