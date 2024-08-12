'use client';
import { Box, Button, Stack, styled } from '@mui/material';

const AdminFounderWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  margin: '36px',
  padding: '24px',
  borderRadius: '24px',
  [theme.breakpoints.down('md')]: {
    margin: '16px',
    padding: '16px',
  },
}));

const AdminFounderInputWrapper = styled(Stack)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  borderRadius: '100px',
  padding: '8px 16px',
  [theme.breakpoints.down('sm')]: {
    padding: '5px 10px',
    width: '100%',
  },
}));

const AdminFounderInput = styled('input')(({ theme }) => ({
  border: 'none',
  '&:focus': {
    outline: 'none',
  },
  width: '100%',
}));

const PaymentsFilterButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  lineHeight: '19px',
  padding: '10px 40px',
  borderRadius: '100px',
  textTransform: 'none',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.info.light,
  boxShadow: 'none',
  textWrap: 'nowrap',

  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    padding: '8px 20px',
  },
  ':hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.info.light,
  },
}));

const TableButton = styled(Button)(({ theme }) => ({
  borderRadius: '100px',
  backgroundColor: theme.palette.info.light,
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: '600',
  padding: '6px 12px',
  textWrap: 'nowrap',
}));

const PaymentPopperBoxWrapper = styled(Box)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  borderRadius: '24px',
  padding: '16px',
  backgroundColor: theme.palette.info.light,
  zIndex: '2',
  [theme.breakpoints.down('md')]: {
    padding: '16px',
  },
}));

const PaymentFilterButtonWrapper = styled(Button)(({ theme }) => ({
  borderRadius: '100px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  [theme.breakpoints.down('md')]: {
    padding: '5px 10px',
    fontSize: '14px',
  },
}));

export {
  AdminFounderWrapper,
  AdminFounderInputWrapper,
  AdminFounderInput,
  TableButton,
  PaymentPopperBoxWrapper,
  PaymentFilterButtonWrapper,
  PaymentsFilterButton,
};
