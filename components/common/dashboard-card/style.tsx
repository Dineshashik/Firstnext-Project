'use client';
import { styled, Box } from '@mui/material';
import Image from 'next/image';

const DashboardCardWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  boxShadow: '4px 8px 16px 0px #635BFF1A',
  padding: '1.5rem',
  borderRadius: '24px',
  position: 'relative',
  minHeight: '214px',
}));

const BackGroungImage = styled(Image)(({ theme }) => ({
  position: 'absolute',
  height: '135px',
  bottom: '0px',
  right: '20%',
}));

export { DashboardCardWrapper, BackGroungImage };
