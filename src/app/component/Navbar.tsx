'use client'
import {  signIn, signOut, useSession } from "next-auth/react";
import { FaBell, FaHome, FaCompass, FaPlay, FaHistory, FaClock, FaThumbsUp, FaSearch, FaVideo, FaBars } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";

import { ReactNode, useEffect, useState } from "react";

import  Image  from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { GetVideoById } from "../api/auth/youtubeapi";


interface NavbarProps {
  isSidebarOpen: boolean,
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({ isSidebarOpen, setIsSidebarOpen}: NavbarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearchValue] = useState('');
  const {data: session, status} = useSession()

 
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetVideoById();
  
      } catch (error) {
        console.error('Failed to fetch video data:', error);
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
      <nav className="flex justify-between items-center p-2 bg-white border-b border-gray-200">
        {/* Left section */}
        <div className="flex items-center">
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <FaBars size={20} color="#606060" />
          </button>
          <div className="flex items-center ml-4 h-[20px] w-[90px]">
            <Icons.yt />
          </div>
        </div>

        {/* Center section - Search bar */}
        <form className="hidden md:flex items-center justify-center flex-grow mx-8 h-[40px]">
          <div className="flex w-full max-w-[600px]">
            <div className="flex items-center border border-gray-300 rounded-l-full w-full transition-all duration-200  has-[:focus]:border-blue-500">
              <input
                type="search"
                placeholder="Search"
                onChange={(e)=> setSearchTerm(e.target.value)}
              className="peer flex-1 px-4 order-2 py-2 text-gray-700 bg-transparent focus:outline-none"
              />
              <button onClick={(e)=> handleSearch(e)} className="pl-2 peer-focus:block hidden">
                <Icons.search />
              </button>
            </div>
          </div>
          <span className="px-6 py-2 h-full bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
            <Icons.search />
          </span>
        </form>

        {/* Right section */}
        <div className="flex items-center">
          <button className="p-2 mx-2 hover:bg-gray-100 rounded-full">
            <FaVideo size={20} color="#606060" />
          </button>
          <button className="p-2 mx-2 hover:bg-gray-100 rounded-full">
            <FaBell size={20} color="#606060" />
          </button>
          {status != 'authenticated' ? (
        <>  
     

     <button
            className="p-2 mx-2 hover:bg-gray-100 rounded-full flex items-center text-gray-700"
            onClick={() => signIn('google')}
          >
            <span className="mr-2">Login</span>
        
          </button>
        </>
      ) : (
        <>
            <DropdownMenu>
  <DropdownMenuTrigger className="relative w-8 h-8 rounded-full overflow-hidden">
<Image src={session.user?.image || ''} alt="user image" fill className="h-auto"/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={()=> signOut()}>Logout</DropdownMenuItem>
 
  </DropdownMenuContent>
</DropdownMenu>
</> 
      )}
        </div>
      </nav>

      {/* Sidebar */}
      {/* <div className="flex">
        <div
          className={`fixed md:relative z-10 flex flex-col h-full p-4 border-r border-2 border-red-400 transition duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 ${isSidebarOpen ? "md:w-60" : "md:w-fit"}`}
        > */}
          {/* <Sidebar isSidebarOpen={isSidebarOpen}/> */}
        {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default Navbar;
