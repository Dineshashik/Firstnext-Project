'use client';
import { Box, Button, Stack, Typography, styled } from '@mui/material';

const AdminSupportWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  margin: '36px',
  padding: '24px',
  borderRadius: '24px',
  [theme.breakpoints.down('md')]: {
    margin: '16px',
    padding: '16px',
  },
}));

const AdminSupportInputWrapper = styled(Stack)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  borderRadius: '100px',
  padding: '8px 16px',
  [theme.breakpoints.down('sm')]: {
    padding: '5px 10px',
    width: '100%',
  },
}));

const AdminSupportInput = styled('input')(({ theme }) => ({
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

const EmailTypography = styled(Typography)(({ theme }) => ({
  textDecoration: 'underline',
  cursor: 'pointer',
}));

export {
  AdminSupportWrapper,
  AdminSupportInputWrapper,
  AdminSupportInput,
  TableButton,
  EmailTypography,
};
