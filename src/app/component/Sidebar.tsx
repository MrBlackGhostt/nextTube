'use client';
import Link from 'next/link';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Home, ListVideo, History } from 'lucide-react';
import { MdSubscriptions } from 'react-icons/md';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: MdSubscriptions, label: 'Subscriptions', href: '/subscriptions' },
  { icon: ListVideo, label: 'Playlist', href: '/playlist' },
  { icon: History, label: 'History', href: '/history' },
];

const Sidebar = () => {
  const searchParams = useSearchParams();
  const isSidebarOpen = searchParams.get('s') === 'open';

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
      </nav>
    </aside>
  );
};

export default Sidebar;
