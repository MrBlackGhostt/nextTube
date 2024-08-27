'use client'
import {  FaBell, FaHome, FaCompass, FaPlay, FaHistory, FaClock, FaThumbsUp, FaSearch, FaVideo, FaBars } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";
import Image from 'next/image';
import { CgProfile } from "react-icons/cg";
import { ReactNode, useState } from "react";

const Navbar = ({children}:{children:ReactNode}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <> 
      {/* Navbar */}
      <nav className="flex justify-between items-center p-2 bg-white border-b border-gray-200">
        {/* Left section */}
        <div className="flex items-center">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full " 
            onClick={() => setIsSidebarOpen(prev => !prev)}
          >
            <FaBars size={20} color="#606060" />
          </button>
          <div className="flex items-center ml-4">
            <Image src="/images/youtube-logo.png" alt="YouTube" width={90} height={20} />
          </div>
        </div>

        {/* Center section - Search bar */}
        <div className="hidden md:flex items-center justify-center flex-grow mx-8">
          <div className="flex items-center w-full max-w-[600px]">
            <input
              type="search"
              placeholder="Search"
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
            />
            <button className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
              <FaSearch size={24} color="#606060" />
            </button>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center">
          <button className="p-2 mx-2 hover:bg-gray-100 rounded-full">
            <FaVideo size={20} color="#606060" />
          </button>
          <button className="p-2 mx-2 hover:bg-gray-100 rounded-full">
            <FaBell size={20} color="#606060" />
          </button>
          <button className="p-2 mx-2 hover:bg-gray-100 rounded-full">
            <CgProfile size={24} color="#606060" />
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="flex"> 

      <div className={`fixed md:relative z-10 flex flex-col h-full p-4 border-r  border-2 border-red-400 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${isSidebarOpen ? 'md:w-60' : 'md:w-fit'} `}>
        {/* Top section */}
        <div className={`flex flex-col mb-4 `}>
          <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-lg">
            <span className="mr-4"><FaHome size={20} /></span>
            {isSidebarOpen && <span className="text-sm font-medium">Home</span>}
          </button>
          <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-lg">
            <span className="mr-4"><MdSubscriptions size={20} /></span>
            {isSidebarOpen && <span className="text-sm font-medium">Subscriptions</span>}
          </button>
          <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-lg">
            <span className="mr-4"><FaPlay size={20} /></span>
            {isSidebarOpen && <span className="text-sm font-medium">Playlist</span>}
          </button>
        </div>

        {/* Middle section */}
        {isSidebarOpen && (
          <div className="flex flex-col mb-4 border-t border-gray-200 pt-4">
            <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span className="mr-4"><FaHistory size={20} /></span>
              <span className="text-sm font-medium">History</span>
            </button>
            <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span className="mr-4"><RiVideoLine size={20} /></span>
              <span className="text-sm font-medium">Your Videos</span>
            </button>
            <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span className="mr-4"><FaClock size={20} /></span>
              <span className="text-sm font-medium">Watch Later</span>
            </button>
            <button className="flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span className="mr-4"><FaThumbsUp size={20} /></span>
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
}

export default Navbar;
