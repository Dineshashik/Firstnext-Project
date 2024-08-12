'use client';
import { Typography, Stack, styled, Button } from '@mui/material';

const MsgTilesWrapper = styled(Stack)(({ index }: { index: number }) => ({
  borderRadius: '10px',
  padding: '10px 16px',
  margin: '3px 0px',
  backgroundColor: index % 2 === 0 ? '#EDF3FA' : '#DEEAF6',
  cursor:'pointer'
}));

const MessageDetailsTextWrapper = styled(Typography)(() => ({
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  paddingTop: '4px',
}));

const TilesButtonWrapper = styled(Button)(({ theme }) => ({
  fontWeight: '600',
  backgroundColor: theme.palette.info.light,
  borderRadius: '100px',
  padding: '8px 16px',
  textTransform: 'none',
}));

export { MsgTilesWrapper, MessageDetailsTextWrapper, TilesButtonWrapper };
