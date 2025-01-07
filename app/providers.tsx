'use client';

import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';

function ThemeInitializer() {
  useEffect(() => {
    // This will run only on the client side
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && systemTheme === 'dark')) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="theme"
    >
      <ThemeInitializer />
      {children}
    </ThemeProvider>
  );
}
