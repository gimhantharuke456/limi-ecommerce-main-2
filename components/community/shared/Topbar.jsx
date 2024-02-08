"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Topbar = () => {
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-dark-2 px-6 py-3">
      <Link href="/" className="flex items-center gap-4">
        <Image src={"/logo.png"} width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">
          Green Harvest
        </p>
      </Link>
    </nav>
  );
};

export default Topbar;
