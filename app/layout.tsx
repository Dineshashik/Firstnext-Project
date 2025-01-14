'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import theme from '../theme';
import './globals.css';
import { ThemeProvider } from '@mui/material/styles';
import StoreProvider from './storeProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import cookie from 'cookie';
import { SocketProvider } from '@/context/SocketContext';
import 'react-phone-input-2/lib/material.css';
const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Matchudo',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon-logo.svg"
          sizes="any"
        />
        <title>Let&#39;s Connect</title>
      </head>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <SocketProvider>
            <StoreProvider>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
              <ToastContainer />
            </StoreProvider>
          </SocketProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
