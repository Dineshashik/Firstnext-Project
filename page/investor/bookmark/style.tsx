'use client';
import { Box, Button, Stack, Tab, styled } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const BookmarkPageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  margin: '36px',
  padding: '24px',
  borderRadius: '24px',
  [theme.breakpoints.down('md')]: {
    margin: '16px',
    padding: '16px',
  },
}));

const SearchProjectInputWrapper = styled(Stack)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  borderRadius: '100px',
  padding: '8px 16px',
  [theme.breakpoints.down('sm')]: {
    padding: '5px 10px',
    width: '100%',
  },
}));

const SearchProjectInput = styled('input')(({ theme }) => ({
  border: 'none',
  marginRight: '60px',
  '&:focus': {
    outline: 'none',
  },
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    marginRight: '30px',
  },
}));

const ClearButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: 'none',
  borderRadius: '50px',
  fontSize: '14px',
  fontWeight: '600',
  textWrap: 'nowrap',
  width: '50%',
  [theme.breakpoints.down('md')]: {
    width: '20%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '30%',
  },
}));

const BookmarkFilterButton = styled(Button)(({ theme }) => ({
  borderRadius: '100px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
  boxShadow: 'none',
  [theme.breakpoints.down('md')]: {
    padding: '5px 10px',
    fontSize: '14px',
  },
}));

const ModalIconWrapper = styled(Stack)(({ theme }) => ({
  borderRadius: '100px',
  background: '#F6F9FC',
  width: '160px',
  height: '160px',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CheckIconWrapper = styled(CheckIcon)(({ theme }) => ({
  width: '60px',
  fontSize: '100px',
  height: '60px',
  color: theme.palette.primary.light,
}));

const BookmarkPopperBoxWrapper = styled(Box)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  borderRadius: '24px',
  padding: '16px',
  width: '300px',
  backgroundColor: theme.palette.info.light,
  [theme.breakpoints.down('md')]: {
    padding: '16px',
  },
}));

const BookmarkFilterButtonWrapper = styled(Button)(({ theme }) => ({
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
  BookmarkPageWrapper,
  SearchProjectInput,
  SearchProjectInputWrapper,
  ClearButton,
  BookmarkFilterButton,
  ModalIconWrapper,
  CheckIconWrapper,
  BookmarkPopperBoxWrapper,
  BookmarkFilterButtonWrapper,
};
