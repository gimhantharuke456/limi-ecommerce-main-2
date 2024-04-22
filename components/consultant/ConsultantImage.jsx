import React, { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
const ConsultantImage = ({ id }) => {
  const [image, setImage] = useState(
    "https://utfs.io/f/4d0a7431-bb89-4db8-86e5-882d528cc023-no7jkf.webp"
  );
  useEffect(() => {
    const docRef = doc(db, "consultants", id);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          // Use the data
          setImage(docSnap.data()["image"]);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [id]);
  return (
    <Image
      src={image}
      alt={id}
      width={556}
      height={556}
      className="w-full h-48 object-cover"
    />
  );
};

export default ConsultantImage;
