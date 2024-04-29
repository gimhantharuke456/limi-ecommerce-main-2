"use client";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import React, { useState } from "react";
const BookFarmVisitButton = ({ userid, marketid, market }) => {
  const [loading, setLoading] = useState(false);
  const handleBooking = async () => {
    setLoading(true);
    const confirmation = confirm(
      `Do you want to book a visit to ${market.title}?`
    );
    if (confirmation) {
      const bookingData = {
        marketId: marketid,
        userId: userid,
        bookedAt: new Date(),
        status: "PENDING",
      };

      try {
        await setDoc(doc(db, "farm_bookings", `${Date.now()}`), bookingData);
        alert("Booking successful!");
      } catch (error) {
        console.error("Error booking visit:", error);
        alert("Failed to book the visit.");
      }
    }
    setLoading(false);
  };
  return (
    <button
      onClick={handleBooking}
      className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-lime-700 rounded-lg border border-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
    >
      Book a visit
    </button>
  );
};

export default BookFarmVisitButton;
