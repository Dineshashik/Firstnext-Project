'use client';
import { Box, Stack, styled } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const LikedByInvestorsWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  margin: '36px',
  padding: '24px',
  borderRadius: '24px',
  [theme.breakpoints.down('md')]: {
    margin: '16px',
    padding: '16px',
  },
}));

const LikedByInvestorsInputWrapper = styled(Stack)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  borderRadius: '100px',
  padding: '8px 16px',
  [theme.breakpoints.down('sm')]: {
    padding: '5px 10px',
    width: '100%',
  },
}));

const LikedByInvestorsInput = styled('input')(({ theme }) => ({
  border: 'none',
  '&:focus': {
    outline: 'none',
  },
  width: '100%',
}));

const CheckIconWrapper = styled(CheckIcon)(({ theme }) => ({
  width: '60px',
  fontSize: '100px',
  height: '60px',
  color: theme.palette.primary.light,
}));

const ModalIconWrapper = styled(Stack)(({ theme }) => ({
  borderRadius: '100px',
  background: '#F6F9FC',
  width: '160px',
  height: '160px',
  alignItems: 'center',
  justifyContent: 'center',
}));

export {
  LikedByInvestorsWrapper,
  LikedByInvestorsInputWrapper,
  LikedByInvestorsInput,
  CheckIconWrapper,
  ModalIconWrapper,
};
