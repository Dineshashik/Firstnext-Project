import { Box, Stack, styled } from '@mui/material';
import Image from 'next/image';

const ProjectDetailsImageWrapper = styled(Box)(({ theme }) => ({
  height: '350px',
  position: 'relative',
  [theme.breakpoints.down('lg')]: {
    height: '250px',
  },
  [theme.breakpoints.down('md')]: {
    height: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '150px',
  },
}));

const ProjectDetailsCompanyImage = styled(Image)(() => ({
  borderRadius: '16px',
  // width: '100%',
  height: '100%',
  margin: 'auto',
  top: '0px',
  left: '0px',
  objectFit: 'cover',
}));

const RequiredFundingWrapper = styled(Stack)(() => ({
  padding: '24px',
  backgroundColor: '#DEEAF6',
  borderRadius: '10px',
}));

export {
  ProjectDetailsImageWrapper,
  ProjectDetailsCompanyImage,
  RequiredFundingWrapper,
};
