'use client';
import { CardWrapper } from '@/components/common/ui';
import { Box, Button, Theme, Typography, styled } from '@mui/material';

const TableText = styled(Typography)(({ iseven }: { iseven: string }) => ({
  borderRadius: '10px',
  marginBottom: '6px',
  padding: '14px 21px',
  backgroundColor: iseven === 'true' ? '#EBF3FC' : '#F6F9FC',
}));

const SubscriptionCardWrapper = styled(Box)(({ theme }) => ({
  overflow: 'auto',
  minHeight: 'calc(100vh - 202px)',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}));

const CancelPlanButton = styled(Button)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  width: '100%',
  textTransform: 'none',
  borderRadius: '100px',
  fontSize: '16px',
  fontWeight: '600',
  padding: '14px 0px',
}));

const ConfirmCardWrapper = styled(CardWrapper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  p: 4,
  [theme.breakpoints.down('md')]: {
    width: '90%',
  },
}));

export {
  TableText,
  SubscriptionCardWrapper,
  CancelPlanButton,
  ConfirmCardWrapper,
};
