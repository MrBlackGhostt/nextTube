'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  FaBell,

  FaSearch,

  FaBars,
} from 'react-icons/fa';

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

import { GoArrowLeft } from 'react-icons/go';

const Navbar = () => {
  const pathName = usePathname();
 const searchParams = useSearchParams()
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
      const newUrl = `home?${queryString}`;

      router.push(newUrl);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Update the URL with the query parameter
    newParams.append('q', searchTerm);

    const queryString = newParams.toString();
    const newUrl = `home?${queryString}`;

    router.push(newUrl);
  };

  const handleSidebar = ()=>{
    setSidebarOpen(sidebarOpen == 'open' ? 'close' : 'open');

    newParams.append('s', sidebarOpen);
    if (searchTerm) newParams.append('q', searchTerm);
    const id = searchParams.get('id')
    if (id) newParams.append('id', id);

    const queryString = newParams.toString();
    const newUrl = `${pathName}?${queryString}`;
    router.push(newUrl);
  }

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center sticky top-0 z-50 p-2 bg-white dark:bg-black">
        {/* Left section */}
        {mobileSearch && (
          <div className="absolute top-0 left-0 flex items-center justify-between w-full py-2 z-50 bg-white dark:bg-black shadow-md">
            {/* Back Arrow Icon */}
            <GoArrowLeft
              className="w-10 h-10 text-gray-600 dark:text-slate-200 cursor-pointer"
              onClick={() => setMobileSearch(!mobileSearch)}
            />

            {/* Search Input */}
            <input
              type="search"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow ml-2 px-2 py-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 dark:bg-zinc-800 dark:text-slate-200 dark:border-gray-600"
            />

            {/* Search Button */}
            <button
              onClick={(e) => handleSearch(e)}
              className="px-2 py-1 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 dark:bg-zinc-800 dark:border-gray-600"
            >
              <FaSearch size={24} color="#606060" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full group"
            onClick={handleSidebar}
          >
            <FaBars
              size={20}
              className="dark:text-slate-200 dark:group-hover:text-slate-100"
            />
          </button>
          <div className="flex relative md:w-12 md:h-12  items-center ml-6">
            <Image
              src="/images/nexttube logo.webp"
              alt="YouTube"
              fill
              className="rounded-full"
            />
          </div>
        </div>

        {/* Center section - Search bar */}
        <div className="hidden md:flex items-center justify-center flex-grow mx-8">
          <div className="flex items-center w-full max-w-[600px]">
            <input
              type="search"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-l-full focus:outline-none focus:border-blue-500 dark:bg-zinc-800 dark:text-slate-200"
            />
            <button
              onClick={(e) => handleSearch(e)}
              className="px-6 py-2 bg-gray-100 dark:bg-zinc-800 rounded-r-full"
            >
              <FaSearch size={24} color="#606060" />
            </button>
          </div>
        </div>
        {/* Right section */}
        <div className="flex items-center justify-between w-fit gap-2 pr-2">
          <FaSearch
            className="md:hidden"
            size={24}
            color="#606060"
            onClick={() => setMobileSearch(!mobileSearch)}
          />

          <button className="hidden md:flex p-2 hover:bg-gray-100  dark:hover:bg-gray-800 rounded-full">
            <FaBell size={20} className="text-slate-800 dark:text-slate-200" />
          </button>
          <ModeToggle />
          <div className="hidden md:flex">
            {status != 'authenticated' ? (
              <div>
                <button
                  className="p-2 mx-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full flex items-center dark:text-slate-200 dark:hover:text-slate-100"
                  onClick={() => signIn('google')}
                >
                  <span className="">Login</span>
                </button>
              </div>
            ) : (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={session.user?.image || ''}
                      alt="user image"
                      fill
                      className="h-auto"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
