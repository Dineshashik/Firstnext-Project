'use client';
import { CardWrapper } from '@/components/common/ui';
import { Opacity } from '@mui/icons-material';
import { Box, Button, Select, Stack, styled } from '@mui/material';

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
  alignItems: 'center',
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

const TableButton = styled(Button)(({ theme }) => ({
  borderRadius: '100px',
  backgroundColor: theme.palette.info.light,
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: '600',
  padding: '6px 12px',
  textWrap: 'nowrap',
  '&:hover': {
    backgroundColor: theme.palette.info.light,
    opacity: '80%'
  }
}));

const FounderPopperBoxWrapper = styled(Box)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  borderRadius: '24px',
  padding: '16px',
  backgroundColor: theme.palette.info.light,
  [theme.breakpoints.down('md')]: {
    padding: '16px',
  },
}));

const FounderFilterButtonWrapper = styled(Button)(({ theme }) => ({
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

const FilterButton = styled(Button)(({ theme }) => ({
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
  color: value === 'Active' ? theme.palette.primary.main : theme.palette.error.main,
  fontWeight: '600'
}));
export {
  AdminFounderWrapper,
  AdminFounderInputWrapper,
  AdminFounderInput,
  TableButton,
  FounderPopperBoxWrapper,
  FounderFilterButtonWrapper,
  MoreDetailsModalWrapper,
  FilterButton,
  SelectWrapper
};
