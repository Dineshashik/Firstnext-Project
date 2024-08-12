'use client';
import { styled, Box, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const InvestorCardWrapper = styled(Box)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  borderRadius: '24px',
}));

const InvestorImageWrapper = styled(Box)(({ theme }) => ({
  height: '250px',
  position: 'relative',
  margin: '8px',
  [theme.breakpoints.down('md')]: {
    height: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '200px',
  },
}));

const InvestorImage = styled(Image)(() => ({
  borderRadius: '16px 16px 0px 0px',
  width: '100%',
  height: '100%',
  top: '0px',
  left: '0px',
  objectFit: 'cover',
}));

const ConnectButton = styled(Button)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  width: '100%',
  textTransform: 'none',
  borderRadius: '100px',
  fontSize: '16px',
  fontWeight: '600',
  padding: '14px 0px',
  height: '48px',
}));

const NextLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
}));

export {
  InvestorCardWrapper,
  InvestorImageWrapper,
  InvestorImage,
  ConnectButton,
  NextLink,
};
