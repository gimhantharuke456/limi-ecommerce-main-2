"use client";
import {
  AlignJustify,
  Bell,
  LayoutDashboard,
  LogOut,
  Settings,
  Sun,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeSwitcherBtn from "../ThemeSwitcherBtn";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { useSession } from "next-auth/react";
export default function Navbar({ setShowSidebar, showSidebar }) {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex items-center justify-between bg-white dark:bg-slate-800 text-slate-50 h-20 py-8 fixed top-0 w-full px-8 z-50 sm:pr-[20rem] ">
      <Link href={"/dashboard"} className="sm:hidden">
        Green Harvest
      </Link>
      {/* Icon */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="text-lime-700 dark:text-lime-500"
      >
        <AlignJustify />
      </button>
      {/* 3 Icons */}
      <div className="flex space-x-3 ">
        <ThemeSwitcherBtn />

        {status === "authenticated" && <UserAvatar user={session?.user} />}
      </div>
    </div>
  );
}
