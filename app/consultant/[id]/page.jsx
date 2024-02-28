"use client";
import ChatList from "@/components/consultant/ChatList";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatBox from "@/components/consultant/ChatBox";

const Page = () => {
  const [activeChatId, setActiveChatId] = useState(null);
  const params = useParams();
  const id = params.id;

  useEffect(() => {}, []);

  return (
    <div
      style={{ height: "100vh", width: "100vw", display: "flex", padding: 15 }}
    >
      <ChatList
        id={id}
        onChatClicked={(id) => {
          setActiveChatId(id);
        }}
      />
      <ChatBox activeChatId={activeChatId} />
    </div>
  );
};

export default Page;
