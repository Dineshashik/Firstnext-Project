'use client';
import { Button, styled } from '@mui/material';

const FormWrapper = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  color: '#0A2540',
  borderRadius: '100px',
  border: '1px solid #DEEAF6',
  textTransform: 'none',
  padding: '14px',
  margin: '0px 36px',
  display: 'none',
  height: '48px',

  [theme.breakpoints.down('md')]: {
    padding: '8px 24px',
    marginTop: '16px',
    margin: '16px 0px  0px 0px',
    display: 'block',
    width: 'auto',
    height: '35px',
  },
}));

export { FormWrapper, LogoutButton };
