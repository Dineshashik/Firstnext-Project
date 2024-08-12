'use client';
import { styled, Button, Stack, Dialog } from '@mui/material';

const DialogWrapper = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    height: '100%',
    borderRadius: '24px',
    [theme.breakpoints.down('sm')]: {
      borderRadius: '0px',
    },
  },
}));

const DialogHeader = styled(Stack)(({ theme }) => ({
  padding: '18px 36px',
  backgroundColor: '#EBF3FC',
  [theme.breakpoints.down('sm')]: {
    padding: '12px 16px',
  },
}));

const DialogButtonWrapper = styled(Button)(({ theme }) => ({
  borderRadius: '100px',
  border: '1px solid #DEEAF6',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 24px',
  [theme.breakpoints.down('md')]: {
    padding: '6px 24px',
  },
}));

const DialogApproveButtonWrapper = styled(DialogButtonWrapper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.info.light,
}));

export {
  DialogButtonWrapper,
  DialogApproveButtonWrapper,
  DialogHeader,
  DialogWrapper,
};
