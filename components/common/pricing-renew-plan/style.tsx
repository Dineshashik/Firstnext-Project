'use client';
import { Box, Card, Stack, Typography, styled } from '@mui/material';
import { CardWrapper } from '../ui';

const PricingPlanHeaderWrapper = styled(Box)(() => ({
  position: 'relative',
  background: 'linear-gradient(182.9deg, #FF00D4 -62.29%, #00DDFF 156.97%)',
}));

const PricingCardWrapper = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  borderRadius: '50px',
  margin: '8px auto',
  minHeight: 'calc(100% - 8px)',
  maxWidth: '684px',
}));

const PricingTopSection = styled(Stack)(({ theme }) => ({
  background: 'linear-gradient(180deg, #DEEAF6 50%, #FFFFFF 100%)',
  paddingBottom: '2rem',
}));
const TypeText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  margin: '12px 0px',
}));

const TypeTextWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  boxShadow: '4px 8px 64px 0px #00000029',
  borderRadius: '0px 0px 30px 30px',
  marginLeft: '10%',
  marginRight: '10%',
  marginBottom: '2rem',
}));

const RadioButtonWrapper = styled(Stack)(({ theme }) => ({
  boxShadow: '4px 8px 16px 0px #635BFF1A',
  border: '1px solid #DEEAF6',
}));

const PricingPlanCardWrapper = styled(CardWrapper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  p: 4,
  [theme.breakpoints.down('md')]: {
    width: '90%',
  },
}));

export {
  PricingPlanHeaderWrapper,
  PricingCardWrapper,
  TypeText,
  PricingTopSection,
  TypeTextWrapper,
  RadioButtonWrapper,
  PricingPlanCardWrapper,
};
