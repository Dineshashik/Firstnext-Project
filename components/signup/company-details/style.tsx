'use client';
import { CardWrapper } from '@/components/common/ui';
import { Box, Button, styled } from '@mui/material';

const CompanyDetailsCardWrapper = styled(CardWrapper)(({ theme }) => ({
  minHeight: 'calc(100vh - 194px)',
}));

export { CompanyDetailsCardWrapper };
