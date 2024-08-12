import { styled, Tab } from '@mui/material';

const TabWrapper = styled(Tab)(({ theme }) => ({
  '&.Mui-selected': {
    background: '#DEEAF6',
    color: '#0A2540',
  },
  border: '1px solid #DEEAF6',
  color: '#0A2540',
  fontSize: '14px',
  fontWeight: 600,
  borderRadius: '100px',
  textTransform: 'none',
  marginRight: '16px',
  padding: '13px 32px',
  minHeight: 'auto !important',
  [theme.breakpoints.down('md')]: {
    padding: '8px 18px',
    marginRight: '8px',
  },
}));

export { TabWrapper };
