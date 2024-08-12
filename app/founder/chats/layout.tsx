'use client';
import { SocketProvider } from '@/context/SocketContext';
import { ChatPageWrapper, GridWrapper } from './style';
import { CardWrapper } from '@/components/common/ui';
import { Grid, Theme, useMediaQuery } from '@mui/material';
import ChatList from '@/components/chats/chatlist';
import { FOUNDER } from '@/helpers/constants';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ChatCardWrapper } from '@/app/investor/chats/style';

const ChatLayout = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const isChatListPage = path === '/founder/chats';
  const isChatPage = path.startsWith('/founder/chats/');
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );
  return (
    <>
      <ChatPageWrapper>
        <ChatCardWrapper>
          <Grid
            container
            spacing={2}
            height="100%"
            mt={0}
          >
            {isSmallScreen ? (
              <>
                {isChatListPage && (
                  <Grid
                    item
                    xs={12}
                  >
                    <ChatList type={FOUNDER} />
                  </Grid>
                )}
                {isChatPage && (
                  <GridWrapper
                    item
                    xs={12}
                  >
                    {children}
                  </GridWrapper>
                )}
              </>
            ) : (
              <>
                <Grid
                  item
                  xs={12}
                  md={4}
                >
                  <ChatList type={FOUNDER} />
                </Grid>
                <GridWrapper
                  item
                  xs={12}
                  md={8}
                >
                  {children}
                </GridWrapper>
              </>
            )}
          </Grid>
        </ChatCardWrapper>
      </ChatPageWrapper>
    </>
  );
};

export default ChatLayout;
