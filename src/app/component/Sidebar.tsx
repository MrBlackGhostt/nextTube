"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation"; // Import useRouter for navigation
import {
  FaHome,
  FaPlay,
  FaHistory,

} from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Sidebar = () => {
  const searchParams = useSearchParams();
  const isSidebarOpen = searchParams.get("s") === "open"; 
  const { data: session, status } = useSession();



  return (
    <div className="flex">
      <div
        className={`fixed  z-10 flex flex-col h-full p-4 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }  ${isSidebarOpen ? "w-fit md:w-fit bg-slate-200 dark:bg-slate-800 rounded-lg" : "md:w-fit"}  `}
      >
        {/* Top section */}
        <div className="flex flex-col mb-4">
          <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Link href="/" className="mr-4">
              <FaHome size={20} className="dark:text-slate-200" />
            </Link>
            {isSidebarOpen && (
              <Link href="/" className="text-sm font-medium dark:text-slate-200">
                Home
              </Link>
            )}
          </button>
          <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Link href="/subscriptions" className="mr-4">
              <MdSubscriptions size={20} className="dark:text-slate-200" />
            </Link>
            {isSidebarOpen && (
              <Link href="/subscriptions" className="text-sm font-medium dark:text-slate-200">
                Subscriptions
              </Link>
            )}
          </button>
          <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <span className="mr-4">
              <FaPlay size={20} className="dark:text-slate-200" />
            </span>
            {isSidebarOpen && (
              <Link href="/playlist" className="text-sm font-medium dark:text-slate-200">
                Playlist
              </Link>
            )}
          </button>

          <div className="flex md:hidden">
            {status !== "authenticated" ? (
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
                  <DropdownMenuTrigger className="flex items-center gap-1 w-fit relative rounded-full">
                    <div className="relative w-8 h-8">
                      <Image
                        src={session?.user?.image || ""}
                        alt="user image"
                        fill
                        className="h-auto rounded-full"
                      />
                    </div>
                    <div className="text-sm">{session?.user?.name}</div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
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
              <Link href="/history" className="text-sm font-medium dark:text-slate-200">
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
    </div>
  );
};

export default Sidebar;
