'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Search, Bell, Menu, ArrowLeft, LogIn } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ModeToggle } from '@/components/theme-toggler';
import { useState } from 'react';

const Navbar = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [mobileSearch, setMobileSearch] = useState<boolean>(false);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState<string>('close');
  const [searchTerm, setSearchTerm] = useState('');

  const newParams = new URLSearchParams();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      newParams.append('q', searchTerm);
      const queryString = newParams.toString();
      const newUrl = `${pathName}?${queryString}`;
      router.push(newUrl);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    newParams.append('q', searchTerm);
    const queryString = newParams.toString();
    const newUrl = `${pathName}?${queryString}`;
    router.push(newUrl);
  };

  const handleSidebar = () => {
    setSidebarOpen(sidebarOpen == 'open' ? 'close' : 'open');
    newParams.append('s', sidebarOpen);
    if (searchTerm) newParams.append('q', searchTerm);
    const id = searchParams.get('id');
    if (id) newParams.append('id', id);
    const queryString = newParams.toString();
    const newUrl = `${pathName}?${queryString}`;
    router.push(newUrl);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-4 py-2.5 backdrop-blur-xl">
        {/* Mobile search overlay */}
        {mobileSearch && (
          <div className="absolute inset-0 z-50 flex items-center gap-3 bg-background/95 px-3 py-2 backdrop-blur-xl">
            <button
              onClick={() => setMobileSearch(false)}
              className="flex items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex flex-1 items-center overflow-hidden rounded-full border border-border bg-secondary/50">
              <input
                type="search"
                placeholder="Search videos..."
                autoFocus
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={(e) => handleSearch(e)}
                className="flex items-center justify-center px-4 py-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Left section */}
        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            onClick={handleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 md:h-9 md:w-9">
              <Image
                src="/images/nexttube logo.webp"
                alt="NextTube"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="hidden text-lg font-semibold tracking-tight text-foreground md:block">
              NextTube
            </span>
          </div>
        </div>

        {/* Center - Search bar (desktop) */}
        <div className="hidden flex-1 items-center justify-center px-8 md:flex">
          <div className="flex w-full max-w-xl items-center overflow-hidden rounded-full border border-border bg-secondary/50 transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20">
            <input
              type="search"
              placeholder="Search videos..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent px-5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              onClick={(e) => handleSearch(e)}
              className="flex items-center justify-center border-l border-border px-5 py-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-1.5">
          <button
            className="flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
            onClick={() => setMobileSearch(!mobileSearch)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            className="hidden items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:flex"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>

          <ModeToggle />

          <div className="hidden md:flex">
            {status !== 'authenticated' ? (
              <button
                className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                onClick={() => signIn('google')}
              >
                <LogIn className="h-4 w-4" />
                <span>Sign in</span>
              </button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-border transition-all hover:ring-primary/50 focus:outline-none">
                  <Image
                    src={session.user?.image || ''}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-foreground">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-destructive focus:text-destructive"
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
