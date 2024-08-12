'use client';
import { CardWrapper } from '@/components/common/ui';
import { Box, Button, Stack, Select, styled } from '@mui/material';

const AdminInvestorWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  margin: '36px',
  padding: '24px',
  borderRadius: '24px',
  [theme.breakpoints.down('md')]: {
    margin: '16px',
    padding: '16px',
  },
}));

const AdminInvestorInputWrapper = styled(Stack)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  borderRadius: '100px',
  padding: '8px 16px',
  [theme.breakpoints.down('sm')]: {
    padding: '5px 10px',
    width: '100%',
  },
}));

const AdminInvestorInput = styled('input')(({ theme }) => ({
  border: 'none',
  '&:focus': {
    outline: 'none',
  },
  width: '100%',
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

const InvestorPopperBoxWrapper = styled(Box)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  borderRadius: '24px',
  padding: '16px',
  backgroundColor: theme.palette.info.light,
  [theme.breakpoints.down('md')]: {
    padding: '16px',
  },
}));

const InvestorFilterButtonWrapper = styled(Button)(({ theme }) => ({
  borderRadius: '100px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  [theme.breakpoints.down('md')]: {
    padding: '5px 10px',
    fontSize: '14px',
  },
}));

const MoreDetailsModalWrapper = styled(CardWrapper)(({ theme }) => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '24px',
  background: theme.palette.info.light,
  padding: '24px',
  outline: 'none',
  [theme.breakpoints.down('md')]: {
    width: '90%',
    padding: '16px',
    borderRadius: '24px',
  },
  [theme.breakpoints.up('md')]: {
    width: '40%',
  },
}));

const InvestorFilterButton = styled(Button)(({ theme }) => ({
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

const SelectWrapper = styled(Select)(({ theme, value }) => ({
  backgroundColor: theme.palette.info.light,
  border: 'none',
  borderRadius: '20px',
  color:
    value === 'Active' ? theme.palette.primary.main : theme.palette.error.main,
  fontWeight: '600',
}));
export {
  AdminInvestorWrapper,
  AdminInvestorInputWrapper,
  AdminInvestorInput,
  TableButton,
  InvestorPopperBoxWrapper,
  InvestorFilterButtonWrapper,
  MoreDetailsModalWrapper,
  InvestorFilterButton,
  SelectWrapper,
};
