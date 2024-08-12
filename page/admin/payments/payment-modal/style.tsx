'use client';
import { Box, Button, Stack, Tab, Typography, styled } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const PaymentsModalBoxWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '50px',
  background: theme.palette.info.light,
  padding: '24px',
  outline: 'none',
  [theme.breakpoints.down('md')]: {
    width: '90%',
    padding: '16px',
    borderRadius: '24px',
  },
}));

const PaymentsSmTextWrapper = styled(Stack)(
  ({ iseven }: { iseven: string }) => ({
    borderRadius: '10px',
    marginBottom: '6px',
    padding: '8px 16px',
    backgroundColor: iseven === 'true' ? '#EBF3FC' : '#F6F9FC',
  })
);

const PaymentsTableText = styled(Typography)(
  ({ iseven }: { iseven: string }) => ({
    outline: 'none',
    borderRadius: '10px',
    marginBottom: '3px',
    padding: '8px 16px',
    backgroundColor: iseven === 'true' ? '#EBF3FC' : '#F6F9FC',
  })
);

export { PaymentsModalBoxWrapper, PaymentsSmTextWrapper, PaymentsTableText };
