"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  FaBell,
  FaHome,
  FaCompass,
  FaPlay,
  FaHistory,
  FaClock,
  FaThumbsUp,
  FaSearch,
  FaVideo,
  FaBars,
} from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";



import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";


import { ModeToggle } from "@/components/theme-toggler";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";

interface NavbarProps {
  children: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();
const [mobileSearch, setMobileSearch] = useState<boolean>(false)
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>{
  if(event.key === 'Enter'){
    const newUrl = `/home/?q=${searchTerm}`;
    router.push(newUrl);
  }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Update the URL with the query parameter
    const newUrl = `/home/?q=${searchTerm}`;

    router.push(newUrl);
  };


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
            onClick={() => setIsSidebarOpen((prev) => !prev)}
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
              onChange={(e) =>
                setSearchTerm(e.target.value)}
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
      
              <FaSearch className="md:hidden" size={24} color="#606060" onClick={()=>setMobileSearch(!mobileSearch)}/>
          
          <button className="hidden md:flex p-2 hover:bg-gray-100  dark:hover:bg-gray-800 rounded-full">
            <FaBell size={20} className="text-slate-800 dark:text-slate-200" />
          </button>
          <ModeToggle />
<div className="hidden md:flex">

          {status != "authenticated" ? (
            <div >
              <button
                className="p-2 mx-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full flex items-center dark:text-slate-200 dark:hover:text-slate-100"
                onClick={() => signIn("google")}
              >
                <span className="">Login</span>
              </button>
            </div>
          ) : (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={session.user?.image || ""}
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

      {/* Sidebar */}
      <div className="flex">
        <div
          className={`fixed md:relative z-10 flex flex-col h-full p-4 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 ${isSidebarOpen ? "w-2/5 md:w-fit" : "md:w-fit"}`}
        >
          {/* Top section */}
          <div className={`flex flex-col mb-4`}>
            <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <span className="mr-4">
                <FaHome size={20} className="dark:text-slate-200" />
              </span>
              {isSidebarOpen && (
                <Link href={'/home'} className="text-sm font-medium dark:text-slate-200">
                  Home
                </Link>
              )}
            </button>
            <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <span className="mr-4">
                <MdSubscriptions size={20} className="dark:text-slate-200" />
              </span>
              {isSidebarOpen && (
                <Link href={'/subscriptions'} className="text-sm font-medium dark:text-slate-200">
                  Subscriptions
                </Link>
              )}
            </button>
            <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <span className="mr-4">
                <FaPlay size={20} className="dark:text-slate-200" />
              </span>
              {isSidebarOpen && (
                <Link href={'/playlist'} className="text-sm font-medium dark:text-slate-200">
                  Playlist
                </Link>
              )}
            </button>
            <div className="flex md:hidden">

            {status != "authenticated" ? (
            <div>
              <button
                className="p-2 mx-2 hover:bg-gray-100 rounded-full flex items-center dark:text-slate-200 dark:hover:text-slate-800"
                onClick={() => signIn("google")}
              >
                <span className="">Login</span>
              </button>
            </div>
          ) : (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className=" flex items-center gap-1 w-fit  relative  rounded-full ">
                  <div className="relative w-8 h-8">
                  <Image
                    src={session.user?.image || ""}
                    alt="user image"
                    fill
                    className="h-auto rounded-full"
                  />
                  </div>
                  <div className="text-sm  ">{session.user?.name}</div>
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

          {/* Middle section */}
          {isSidebarOpen && (
            <div className="flex flex-col mb-4 border-t border-gray-200 pt-4">
              <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <span className="mr-4">
                  <FaHistory size={20} className="dark:text-slate-200" />
                </span>
                <Link href={'/history'} className="text-sm font-medium dark:text-slate-200">
                  History
                </Link>
              </button>
            </div>
          )}

          {/* Bottom section */}
          {isSidebarOpen && (
            <div className="flex flex-col border-t border-gray-200 pt-4">
              {/* Add more links here if needed */}
            </div>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default Navbar;
