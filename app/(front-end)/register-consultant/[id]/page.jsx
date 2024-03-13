"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import MultipleImageInput from "@/components/FormInputs/MultipleImageInput";
import toast from "react-hot-toast";
import { db } from "@/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [imageUrls, setImageUrls] = useState([]);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Complete name is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values) => {
    if (!imageUrls) {
      return;
    }
    setIsLoading(true);
    const value = {
      image: imageUrls[0],
      ...values,
    };
    await setDoc(doc(db, "consultants", params.id), value).then(() => {
      router.push("/");
    });
    setIsLoading(false);
  };

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Enter your name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={`w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Enter your name  "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 mt-1">{formik.errors.title}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Tell us about your self
            </label>

            <textarea
              id="description"
              name="description"
              rows="3"
              className={`w-full text-black  px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Enter your description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 mt-1">{formik.errors.description}</p>
            )}
          </div>
          <MultipleImageInput
            imageUrls={imageUrls}
            label={"Profile Image"}
            setImageUrls={setImageUrls}
            endpoint="multipleProductsUploader"
          />

          {isLoading ? (
            <p>Creating your profile....</p>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default Page;
