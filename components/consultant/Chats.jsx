import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/context/AuthContext";
import { ChatContext } from "@/context/ChatContex";
import { db } from "@/firebaseConfig";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    if (u) {
      dispatch({ type: "CHANGE_USER", payload: u });
    }
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          if (!chat[1].lastMessage?.userInfo) {
            return <div />;
          }
          return (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].lastMessage?.userInfo)}
            >
              <img src={chat[1].lastMessage?.userInfo?.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chat[1].lastMessage?.userInfo?.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
