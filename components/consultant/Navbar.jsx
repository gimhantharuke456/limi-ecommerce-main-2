"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const params = useParams();
  useEffect(() => {
    const id = params.id;
    const docRef = doc(db, "consultants", id);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          // Use the data
          setUserData(docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);
  return (
    <div className="navbar">
      <span className="logo">Consultant Chat</span>
      <div className="user">
        <img src={userData?.image ?? "/profile.JPG"} alt="" />
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  );
};

export default Navbar;
