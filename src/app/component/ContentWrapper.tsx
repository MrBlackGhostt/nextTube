'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

export default function ContentWrapper({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const isSidebarOpen = searchParams.get('s') === 'open';

  return (
    <main
      className={`flex-1 overflow-y-auto scrollbar-thin transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-56' : 'md:ml-16'
      }`}
    >
      {children}
    </main>
  );
}
