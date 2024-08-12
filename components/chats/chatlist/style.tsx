import { Stack, Box, styled } from '@mui/material';

const ChatListWrapper = styled(Box)(({ theme }) => ({
  borderRight: '1px solid #DEEAF6',
  padding: '0px 16px 0px 0px',
  height: '100%',

  [theme.breakpoints.down('md')]: {
    // padding: '12px 8px',
    // display: 'none',
  },
}));

const ChatListInputWrapper = styled(Stack)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  borderRadius: '100px',
  padding: '8px 16px',

  [theme.breakpoints.down('sm')]: {
    padding: '5px 10px',
    width: '100%',
  },
}));

const ChatListInput = styled('input')(({ theme }) => ({
  border: 'none',
  '&:focus': {
    outline: 'none',
  },
  width: '100%',
}));

const ChatListTilesWrapper = styled(Stack)(({ theme }) => ({
  border: '1px solid #DEEAF6',
  backgroundColor: '#EDF4FB',
  borderRadius: '14px',
  margin: '4px 0px',
  cursor: 'pointer',
}));

export {
  ChatListWrapper,
  ChatListInputWrapper,
  ChatListInput,
  ChatListTilesWrapper,
};
