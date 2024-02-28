import { db } from "@/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const ChatList = ({ onChatClicked, id }) => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const q = query(collection(db, "chats"), where("consultant", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  useEffect(() => {
    {
      fetchChats();
    }
  }, []);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}></div>
  );
};

export default ChatList;
