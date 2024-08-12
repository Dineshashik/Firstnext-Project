import { Box, Button, Stack, Typography, styled } from '@mui/material';

const ChatBoxHeader = styled(Stack)(({ theme }) => ({
  borderBottom: '1px solid #DEEAF6',
  padding: '0px 24px 8px 24px',
  [theme.breakpoints.down('md')]: {
    padding: '4px 12px',
  },
}));

const ChatBoxBody = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  padding: '36px',
  [theme.breakpoints.down('md')]: {
    padding: '12px',
    minHeight: 'calc(100vh - 305px)',
  },
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 341px)',
}));

const ChatBoxFooter = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  padding: '0px 24px',
  marginBottom: '14px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: '0px 12px',
  },
}));

const ChatBoxInputWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  border: '1px solid #DEEAF6',
  borderRadius: '100px',
  padding: '9px',
  width: '100%',
  marginRight: '16px',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    marginBottom: '16px',
    marginRight: '0px',
  },
}));

const ChatBoxMsgInput = styled('input')(({ theme }) => ({
  flexDirection: 'row',
  border: 'none',
  width: '100%',
  outline: 'none',
}));

const BackButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  lineHeight: '19px',
  padding: '15px 20px',
  borderRadius: '100px',
  textTransform: 'none',
  height: '44px',
  background: theme.palette.primary.main,
  color: theme.palette.info.light,
  boxShadow: 'none',
  textWrap: 'nowrap',
  '&:hover': {
    background: theme.palette.primary.main,
  },
}));

// const AttachmentWrapper = styled(Box)(({ theme }) => ({
//   backgroundColor: theme.palette.info.light,
//   marginTop: '16px',
//   maxWidth: '400px',
//   borderRadius: '12px',
//   boxShadow: '0px 4px 20px 0px #00000040',

//   [theme.breakpoints.down('md')]: {
//     marginTop: '8px',
//   },
// }));

const AttachmentWrapper = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '4px 12px',
  borderRadius: '24px',
  color: theme.palette.info.light,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

const MessageImageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '4px',
  borderRadius: '8px',
}));
export {
  ChatBoxHeader,
  ChatBoxBody,
  ChatBoxFooter,
  ChatBoxInputWrapper,
  ChatBoxMsgInput,
  BackButton,
  AttachmentWrapper,
  MessageImageWrapper,
};
