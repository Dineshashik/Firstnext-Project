'use client';
import { CardWrapper } from '@/components/common/ui';
import { Box, styled } from '@mui/material';

const PersonalDetailsCardWrapper = styled(CardWrapper)(({ theme }) => ({
  minHeight: 'calc(100vh - 194px)',
}));

export { PersonalDetailsCardWrapper };
