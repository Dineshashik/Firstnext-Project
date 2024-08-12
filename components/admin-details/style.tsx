'use client';
import { Stack, Typography, styled } from '@mui/material';

const TableText = styled(Typography)(({ iseven }: { iseven: string }) => ({
  borderRadius: '10px',
  marginBottom: '6px',
  padding: '14px 21px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: iseven === 'true' ? '#EBF3FC' : '#F6F9FC',
}));

const SmTextWrapper = styled(Stack)(({ iseven }: { iseven: string }) => ({
  borderRadius: '10px',
  marginBottom: '6px',
  padding: '14px 21px',
  backgroundColor: iseven === 'true' ? '#EBF3FC' : '#F6F9FC',
}));

export { TableText, SmTextWrapper };
