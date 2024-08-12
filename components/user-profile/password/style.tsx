'use client';
import { CardWrapper } from '@/components/common/ui';
import { styled, Button, Box } from '@mui/material';

const DeactiveButton = styled(Button)(({ theme }) => ({
  color: '#E93445',
  backgroundColor: '#FCDFE2',
  borderRadius: '100px',
  textTransform: 'none',
  padding: '14px 36px',
  fontWeight: '600',
  height: '48px',
  maxWidth: '245px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    padding: '8px',
    height: '35px',
    marginBottom: '16px',
    marginTop: '8px',
  },
}));

const FormWrapper = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  flexGrow: '1',
  minHeight: '100%',
}));

const DeactivateAccountModal = styled(CardWrapper)(({ theme }) => ({
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

export { DeactiveButton, FormWrapper, BoxWrapper, DeactivateAccountModal };
