"use client";
import { ChatContext } from "@/context/ChatContex";
import { db } from "@/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const { data } = useContext(ChatContext);
  const user = data.user;

  const [description, setDescription] = useState("");
  useEffect(() => {
    const docRef = doc(db, "consultants", user?.mId);
    getDoc(docRef).then((value) => {
      setDescription(value.data().description);
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen max-w-400 px-20">
      <div className="bg-white shadow-md p-6 rounded-lg flex-col justify-center items-center">
        <img
          src={user.photoURL}
          alt="user"
          className="rounded-full h-20 w-20 object-cover"
        />
        <h1 className="text-2xl font-bold mb-4 text-gray-700">
          {user.displayName}
        </h1>
        <h2 className="text-gray-700">Contact email: {user.email}</h2>
        <p className="text-gray-700">{description}</p>
        <Link href={`/consultant/${user.uid}/`}>
          <div
            style={{
              backgroundColor: "#009688",
              color: "#fff",
              width: 100,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <p>Chat</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Page;
