
import "./globals.css";
import Navbar from "./component/Navbar";
import Provider from "./provider";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <Suspense>
              <Navbar>{children}</Navbar>
            </Suspense>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
