'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/lib/createEmotionCache';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme/theme';

const clientSideEmotionCache = createEmotionCache();

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
