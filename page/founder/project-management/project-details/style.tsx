import { styled, Box, Stack } from '@mui/material';
import Image from 'next/image';

const ProjectDetailsWrapper = styled(Box)(({ theme }) => ({
  margin: '36px',
  [theme.breakpoints.down('md')]: {
    margin: '16px',
  },
}));

export { ProjectDetailsWrapper };
