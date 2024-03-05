"use client";
import Sidebar from "@/components/consultant/Sidebar";
import React from "react";
import "../../../styles/consultant.scss";
import Chat from "@/components/consultant/Chat";
const Page = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Page;
