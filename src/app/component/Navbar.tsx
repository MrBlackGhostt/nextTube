'use client'
import {  signIn, signOut, useSession } from "next-auth/react";
import { FaBell, FaHome, FaCompass, FaPlay, FaHistory, FaClock, FaThumbsUp, FaSearch, FaVideo, FaBars } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";
import Image from 'next/image';
// import { CgProfile } from "react-icons/cg";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Icons } from "./icons";
import Sidebar from "./sidebar";

interface NavbarProps {
  isSidebarOpen: boolean,
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({ isSidebarOpen, setIsSidebarOpen}: NavbarProps) => {
  const {data: session, status} = useSession()
console.log('STATUS', )
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
                className="peer flex-1 px-4 order-2 py-2 text-gray-700 bg-transparent focus:outline-none"
              />
              <button className="pl-2 peer-focus:block hidden">
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
          {/* <button className="p-2 mx-2 hover:bg-gray-100 rounded-full" onClick={() => signIn('google')}>
            {/* <CgProfile size={24} color="#606060" /> */}
          {/* Login */}
          {/* </button> */}
          {status != "authenticated" ? (
            <a className="flex items-center border px-4 py-2 border-gray-200 rounded-full cursor-pointer hover:bg-blue-100" onClick={() => signIn("google")}>
              <span>
                <Icons.person color="#065fd4" className="mr-2" />
              </span>
              <h3 className="text-secondary font-medium text-sm">Sign in</h3>
            </a>
          ) : (
            <>
              <p>Welcome, {session?.user?.email}</p>
              <button onClick={() => signOut()}>Sign out</button>
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
