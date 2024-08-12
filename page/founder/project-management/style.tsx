import { styled, Box, Stack, Button } from '@mui/material';

const ProjectManagementWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  margin: '36px',
  padding: '24px',
  borderRadius: '24px',
  [theme.breakpoints.down('md')]: {
    margin: '16px',
    padding: '16px',
  },
}));

const InputWrapper = styled(Stack)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  borderRadius: '100px',
  padding: '8px 16px',
  [theme.breakpoints.down('sm')]: {
    padding: '5px 10px',
    width: '100%',
  },
}));

const Input = styled('input')(({ theme }) => ({
  border: 'none',
  '&:focus': {
    outline: 'none',
  },
  width: '100%',
}));


const DocReqTableButton = styled(Button)(({ theme }) => ({
  borderRadius: '100px',
  backgroundColor: theme.palette.info.light,
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: '600',
  padding: '6px 12px',
  textWrap: 'nowrap',
}));

export { ProjectManagementWrapper, InputWrapper, Input, DocReqTableButton };
