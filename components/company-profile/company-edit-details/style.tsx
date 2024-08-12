import { Box, Button, styled } from '@mui/material';

const CompanyEditDetailsWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  margin: '36px',
  padding: '24px',
  borderRadius: '24px',
  [theme.breakpoints.down('md')]: {
    margin: '16px',
    padding: '16px',
  },
}));

const EditCompanyBackButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  lineHeight: '19px',
  padding: '8px 20px',
  height: '45px',
  borderRadius: '100px',
  textTransform: 'none',
  background: theme.palette.primary.main,
  color: theme.palette.info.light,
  boxShadow: 'none',
  textWrap: 'nowrap',
  '&:hover': {
    background: theme.palette.primary.main,
  },
}));
export { CompanyEditDetailsWrapper, EditCompanyBackButton };
