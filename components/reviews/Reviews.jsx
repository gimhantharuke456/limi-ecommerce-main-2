"use client";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/firebaseConfig";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  addDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

const Reviews = ({ pid }) => {
  const [dummyReviews, setDummyReviews] = useState([]);
  const [review, setReview] = useState("");
  const { currentUser } = useContext(AuthContext);

  const getReviews = async () => {
    const citiesRef = collection(db, "reviews");

    const q = query(citiesRef, where("pid", "==", pid));
    const snapshots = await getDocs(q);
    setDummyReviews(
      snapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  // Function to add a new review
  const addReview = async () => {
    await addDoc(collection(db, "reviews"), {
      pid: pid,
      user: currentUser,
      review: review,
    });
    setDummyReviews([
      ...dummyReviews,
      {
        pid: pid,
        user: currentUser,
        review: review,
      },
    ]);
    setReview("");
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-700 my-8 rounded-xl p-4">
      <h2 className="mb-4 text-xl font-semibold text-slate-200 ml-3">
        Customer Reviews
      </h2>

      {dummyReviews.map((review) => (
        <div key={review.id} className="mb-4">
          <h3 className="font-semibold">{review.user.displayName}</h3>
          <p className="text-gray-500">{review.review}</p>
          <p>{review.comment}</p>
        </div>
      ))}

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Add Your Review</h3>

        <textarea
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          onChange={(e) => setReview(e.target.value)}
        />
        <div style={{ height: 10 }} />
        <button
          onClick={addReview}
          className="bg-green-500 text-white px-4 py-2   hover:bg-blue-600"
          style={{ borderRadius: 10 }}
        >
          Add Review
        </button>
      </div>
    </div>
  );
};

export default Reviews;
