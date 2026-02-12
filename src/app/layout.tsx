import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './component/Navbar';
import Provider, { RecoilProvider } from './provider';
import { Suspense } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Sidebar from './component/Sidebar';
import ContentWrapper from './component/ContentWrapper';
import type { Metadata, Viewport } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'NextTube - Video Discovery Platform',
  description:
    'Discover and watch your favorite videos with NextTube, a premium video discovery platform.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1117' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <RecoilProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Provider>
              <Suspense>
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <div className="flex flex-1">
                    <Sidebar />
                    <ContentWrapper>{children}</ContentWrapper>
                  </div>
                </div>
              </Suspense>
            </Provider>
          </ThemeProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
