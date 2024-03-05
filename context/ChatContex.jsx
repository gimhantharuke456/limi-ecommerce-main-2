"use client";
import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "@/firebaseConfig";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        console.log(`payload ${action.payload.uid}`);
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? auth.currentUser?.uid + action.payload.uid
              : action.payload.uid + auth.currentUser?.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
