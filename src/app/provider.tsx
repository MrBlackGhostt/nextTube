'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

const Provider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;

export const RecoilProvider = ({ children }: { children: ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
