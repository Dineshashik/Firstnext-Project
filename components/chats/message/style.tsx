'use client';
import { Box, Stack, Theme, styled } from '@mui/material';

const MessageWrapper = styled(Stack)(({ issender }: { issender: string }) => ({
  flexDirection: issender === 'true' ? 'row-reverse' : 'row',
  margin: '12px  0px',
}));

const MessageBubble = styled(Box)(
  ({ issender, theme }: { issender: string; theme: Theme }) => ({
    alignItems: 'center',
    flexDirection: issender === 'true' ? 'row-reverse' : 'row',
    padding: '12px 24px',
    backgroundColor: '#EDF4FB',
    borderRadius: '14px',
    marginRight: issender === 'true' ? '8px' : '0px',
    marginLeft: issender === 'true' ? '0px' : '8px',
    [theme.breakpoints.down('md')]: {
      padding: '6px 12px',
    },
  })
);

export { MessageWrapper, MessageBubble };
