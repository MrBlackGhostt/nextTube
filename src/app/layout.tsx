import "./globals.css";
import Navbar from "./component/Navbar";
import Provider from "./provider";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";

import NextTopLoader from "nextjs-toploader";
import { LoginContext } from "./userInfo";
import { useSession } from "next-auth/react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSession = useSession()
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <Provider>
            <NextTopLoader color="#FF0000" showSpinner={false} />
            <Suspense>
              <LoginContext.Provider value={userSession}>


              <Navbar>{children}</Navbar>
              </LoginContext.Provider>
            </Suspense>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
