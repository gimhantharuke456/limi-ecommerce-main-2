"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal, { closeStyle } from "simple-react-modal";
import ChatBox from "./ChatBox";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { ChatContext } from "@/context/ChatContex";
import { useRouter } from "next/navigation";
const customModalOverlayClass = "custom-modal-overlay";
export default async function ConsultantList({ consultants, user }) {
  const router = useRouter();
  const { dispatch } = useContext(ChatContext);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="bg-white border border-gray-300 rounded-lg  dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden">
      <div className="bg-slate-100 dark:bg-gray-800 py-3 px-6 font-semibold border-b border-gray-300 dark:border-gray-600 text-slate-800 dark:text-slate-100 flex justify-between items-center">
        <h2>Green Harvest Consultants</h2>
      </div>
      <div className="bg-white dark:bg-slate-700 p-4">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          ssr={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={}
          dotListClass="custom-dot-list-style"
          itemClass="px-4"
        >
          {consultants.map((consultant, index) => {
            return (
              <div
                onClick={async () => {
                  const q = query(
                    collection(db, "users"),
                    where("email", "==", consultant.email)
                  );

                  const querySnapshot = await getDocs(q);
                  querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    dispatch({ type: "CHANGE_USER", payload: doc.data() });
                    router.push(`consultant/details/${consultant.id}`);
                    return;
                  });
                }}
                key={index}
                className="rounded-lg mr-3 bg-slate-100  dark:bg-slate-900 overflow-hidden cursor-pointer"
              >
                <Image
                  src={
                    "https://utfs.io/f/4d0a7431-bb89-4db8-86e5-882d528cc023-no7jkf.webp"
                  }
                  alt={consultant.id}
                  width={556}
                  height={556}
                  className="w-full h-48 object-cover"
                />
                <h2 className="text-center dark:text-slate-200 text-slate-800 my-2 text-xl line-clamp-2">
                  {consultant.name}
                </h2>
                <p className="px-4 line-clamp-3 text-slate-800 dark:text-slate-300 mb-2">
                  {consultant.email}
                </p>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
