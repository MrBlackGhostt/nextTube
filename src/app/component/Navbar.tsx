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

import { ReactNode, useEffect, useState } from "react";

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
import axios from "axios";
import { GetVideoById } from "../api/auth/youtubeapi";
import { ModeToggle } from "@/components/theme-toggler";

interface NavbarProps {
  children: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearchValue] = useState("");
  const { data: session, status } = useSession();

  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetVideoById();
      } catch (error) {
        console.error("Failed to fetch video data:", error);
      }
    };
  }, [searchParams, router, searchTerm]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Update the URL with the search query parameter
    const newUrl = `/home/?q=${searchTerm}`;

    router.push(newUrl);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-2 bg-white border-b border-gray-200 dark:bg-slate-950">
        {/* Left section */}
        <div className="flex items-center">
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <FaBars size={20} color="#606060" />
          </button>
          <div className="flex items-center ml-4">
            <Image
              src="/images/butterlfy.webp"
              alt="YouTube"
              width={90}
              height={20}
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
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 dark:bg-zinc-800"
            />
            <button
              onClick={(e) => handleSearch(e)}
              className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200"
            >
              <FaSearch size={24} color="#606060" />
            </button>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center">
          <button className="p-2 mx-2 hover:bg-gray-100 rounded-full">
            <FaVideo size={20} className="dark:text-slate-200 text-slate-800" />
          </button>
          <button className="p-2 mx-2 hover:bg-gray-100 rounded-full">
            <FaBell size={20} className="dark:text-slate-200 text-slate-800" />
          </button>
          <ModeToggle />
          {status != "authenticated" ? (
            <>
              <button
                className="p-2 mx-2 hover:bg-gray-100 rounded-full flex items-center dark:text-slate-200 dark:hover:text-slate-800"
                onClick={() => signIn("google")}
              >
                <span className="">Login</span>
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <div className="flex">
        <div
          className={`fixed md:relative z-10 flex flex-col h-full p-4 border-r border-2 border-red-400 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 ${isSidebarOpen ? "md:w-60" : "md:w-fit"}`}
        >
          {/* Top section */}
          <div className={`flex flex-col mb-4`}>
            <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span className="mr-4">
                <FaHome size={20} />
              </span>
              {isSidebarOpen && (
                <span className="text-sm font-medium">Home</span>
              )}
            </button>
            <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span className="mr-4">
                <MdSubscriptions size={20} />
              </span>
              {isSidebarOpen && (
                <span className="text-sm font-medium">Subscriptions</span>
              )}
            </button>
            <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span className="mr-4">
                <FaPlay size={20} />
              </span>
              {isSidebarOpen && (
                <span className="text-sm font-medium">Playlist</span>
              )}
            </button>
          </div>

          {/* Middle section */}
          {isSidebarOpen && (
            <div className="flex flex-col mb-4 border-t border-gray-200 pt-4">
              <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-lg">
                <span className="mr-4">
                  <FaHistory size={20} />
                </span>
                <span className="text-sm font-medium">History</span>
              </button>
              <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-lg">
                <span className="mr-4">
                  <RiVideoLine size={20} />
                </span>
                <span className="text-sm font-medium">Your Videos</span>
              </button>
              <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-lg">
                <span className="mr-4">
                  <FaClock size={20} />
                </span>
                <span className="text-sm font-medium">Watch Later</span>
              </button>
              <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-lg">
                <span className="mr-4">
                  <FaThumbsUp size={20} />
                </span>
                <span className="text-sm font-medium">Liked Videos</span>
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
