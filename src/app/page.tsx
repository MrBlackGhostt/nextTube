"use client";
import { useState } from "react";
import Homepage from "./component/Homepage";
import Navbar from "./component/Navbar";
import Sidebar from "./component/sidebar";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="grid gap-2">
      <header className="h-fit">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </header>
      <div className="flex gap-4">
        <aside className="w-10">
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </aside>
        <main className="ml-[40px]">
          <Homepage />
        </main>
      </div>
    </div>
  );
}
