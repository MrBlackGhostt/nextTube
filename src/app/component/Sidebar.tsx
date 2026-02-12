'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Home, ListVideo, History, LogIn } from 'lucide-react';
import { MdSubscriptions } from 'react-icons/md';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: MdSubscriptions, label: 'Subscriptions', href: '/subscriptions' },
  { icon: ListVideo, label: 'Playlist', href: '/playlist' },
  { icon: History, label: 'History', href: '/history' },
];

const Sidebar = () => {
  const searchParams = useSearchParams();
  const isSidebarOpen = searchParams.get('s') === 'open';
  const { data: session, status } = useSession();

  return (
    <aside
      className={`fixed left-0 top-[57px] z-40 flex h-[calc(100vh-57px)] flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ${
        isSidebarOpen ? 'w-56 translate-x-0' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'
      }`}
    >
      <nav className="flex flex-1 flex-col gap-1 overflow-hidden p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-colors hover:bg-secondary"
            >
              <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
              {isSidebarOpen && (
                <span className="truncate text-sm font-medium">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}

        {/* Mobile auth section */}
        <div className="mt-auto flex flex-col gap-1 border-t border-sidebar-border pt-2 md:hidden">
          {status !== 'authenticated' ? (
            <button
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-colors hover:bg-secondary"
              onClick={() => signIn('google')}
            >
              <LogIn className="h-5 w-5 shrink-0 text-muted-foreground" />
              {isSidebarOpen && (
                <span className="text-sm font-medium">Sign in</span>
              )}
            </button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-colors hover:bg-secondary">
                <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={session?.user?.image || ''}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                {isSidebarOpen && (
                  <span className="truncate text-sm font-medium">
                    {session?.user?.name}
                  </span>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
