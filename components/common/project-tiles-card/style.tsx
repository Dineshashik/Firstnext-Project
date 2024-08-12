'use client';
import { styled } from '@mui/material';
import { CardWrapper } from '../ui';

const ProjectInfoCardWrapper = styled(CardWrapper)(({ theme }) => ({
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

export { ProjectInfoCardWrapper };
