'use client';
import { Stack, Typography, Accordion, styled } from '@mui/material';

const TableText = styled(Typography)(({ iseven }: { iseven: string }) => ({
  borderRadius: '10px',
  marginBottom: '6px',
  padding: '14px 21px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: iseven === 'true' ? '#EBF3FC' : '#F6F9FC',
}));

const SmTextWrapper = styled(Stack)(({ iseven }: { iseven: string }) => ({
  borderRadius: '10px',
  marginBottom: '6px',
  padding: '14px 21px',
  backgroundColor: iseven === 'true' ? '#EBF3FC' : '#F6F9FC',
}));

const AccordionWrapper = styled(Accordion)(() => ({
    boxShadow: "4px 8px 16px 0px #635BFF1A",
    border: "none",
    "&::before": {
      height: "0px",
    },
  }));

export { TableText, AccordionWrapper, SmTextWrapper };
