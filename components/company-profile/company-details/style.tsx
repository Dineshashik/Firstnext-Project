import { styled, Box } from '@mui/material';
import Image from 'next/image';

const CompanyImageWrapper = styled(Box)(({ theme }) => ({
  height: '200px',
  position: 'relative',
  marginBottom: '90px',
}));

const CompanyImage = styled(Image)(({ theme }) => ({
  borderRadius: '16px',
  width: '100%',
  height: '100%',
  top: '0px',
  left: '0px',
  objectFit: 'cover',
}));

const CompanyLogoImage = styled(Image)(({ theme }) => ({
  width: '160px !important',
  height: '160px !important',
  left: '30px !important',
  top: '126px !important',
  objectFit: 'cover',
  borderRadius: '50%',
  [theme.breakpoints.down('md')]: {
    width: '120px !important',
    height: '120px !important',
    top: '140px !important',
  },
}));

export { CompanyImage, CompanyImageWrapper, CompanyLogoImage };
