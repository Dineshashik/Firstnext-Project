'use client';
import { styled } from '@mui/material';
import Image from 'next/image';

const AvtarImageWrapper = styled(Image)(({ theme }) => ({
  borderRadius: '50%',
}));

export { AvtarImageWrapper };
