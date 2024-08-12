'use client';
import { Box, styled } from '@mui/material';
import Image from 'next/image';

const InvestorImageWrapper = styled(Box)(({ theme }) => ({
  height: '200px',
  position: 'relative',
  marginBottom: '120px',
}));

const InvestorBackImage = styled(Image)(({ theme }) => ({
  borderRadius: '16px',
  width: '100%',
  height: '100%',
  top: '0px',
  left: '0px',
  objectFit: 'cover',
}));

const InvestorProfileImage = styled(Image)(({ theme }) => ({
  width: '160px !important',
  height: '160px !important',
  left: '30px !important',
  top: '126px !important',
  objectFit: 'cover',
  borderRadius: '50%',
  [theme.breakpoints.down('md')]: {
    width: '120px !important',
    height: '120px !important',
    top: '140px !important',
  },
}));
export { InvestorImageWrapper, InvestorBackImage, InvestorProfileImage };
