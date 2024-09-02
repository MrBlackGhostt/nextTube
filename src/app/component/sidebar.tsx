"use client";
import React, { useState } from "react";
import { FaClock, FaHistory, FaHome, FaPlay, FaThumbsUp } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";
import { Icons } from "./icons";
import { IconType } from "react-icons";
import Link from "next/link";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const links = [
  { title: "Home", icon: <Icons.home /> },
  { title: "Shorts", icon: <Icons.shorts /> },
  { title: "Subscriptions", icon: <Icons.subscriptions /> },
  { title: "Playlists", icon: <Icons.playlists /> },
];

function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <>
      {/* Top section */}
      <div className={`grid px-2 mb-2`}>
        {links.length
          ? links.map((link) => {
              const Icon = Icons[link?.title.toLowerCase()];
              return (
                <Link href="/"
                  key={link.title + link.icon}
                  className="grid py-4 place-items-center hover:bg-[#f2f2f2] rounded-lg"
                >
                  <span>
                    <Icon size={24} />
                  </span>
                  <span className="text-xs font-light">{link.title}</span>
                </Link>
              );
            })
          : null}
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
    </>
  );
}

export default Sidebar;
