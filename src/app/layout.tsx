
import './globals.css';
import Navbar from './component/Navbar';
import Provider, { RecoilProvider } from './provider';
import { Suspense } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Sidebar from './component/Sidebar';


import ContentWrapper from './component/ContentWrapper';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <RecoilProvider>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <Suspense>
              <div className='grid'>

              <Navbar />
              <div className='flex'>
    

              <Sidebar/>
              
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
