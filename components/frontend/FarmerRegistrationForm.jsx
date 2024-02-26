"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useParams } from "next/navigation";
import MultipleImageInput from "../FormInputs/MultipleImageInput";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function FarmerRegisterForm({ theme }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [productImages, setProductImages] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);

      if (certificates.length <= 0) {
        toast.error("Please upload certificates");
        return;
      }
      if (productImages.length <= 0) {
        toast.error("Please upload farm images");
        return;
      }
      const body = {
        farmName: data.farmName,
        address: data.address,
        farmImages: productImages,
        contactDetails: data.contactDetails,
        organicCertificates: certificates,
        ownedBy: id,
      };
      createFarmer(body);
      setLoading(false);
      toast.success("You regestered Successfully");
      router.push("/");
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  const createFarmer = async (data) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/farm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        return { success: true, data: responseData };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error };
      }
    } catch (error) {
      console.error("Network Error:", error);
      return {
        success: false,
        error: "Something went wrong, please try again",
      };
    }
  };

  const uploadImages = async (data) => {};

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="">
      <TextInput
        label="Farm Name"
        name="farmName"
        register={register}
        errors={errors}
        type="text"
        className="sm:col-span-2"
        theme={theme}
      />
      <div style={{ height: 15 }} />
      <TextInput
        label="Address"
        name="address"
        register={register}
        errors={errors}
        type="text"
        className="sm:col-span-2"
        theme={theme}
      />
      <div style={{ height: 15 }} />
      <MultipleImageInput
        imageUrls={productImages}
        setImageUrls={setProductImages}
        endpoint="multipleProductsUploader"
        label="Image of your farm"
      />

      {/* Add fields for contact details */}
      <TextInput
        label="Contact Details"
        name="contactDetails"
        register={register}
        errors={errors}
        type="text"
        className="sm:col-span-2"
        theme={theme}
      />

      <div style={{ height: 15 }} />
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
        >
          Certificates of organic farming
        </label>
      </div>

      <MultipleImageInput
        imageUrls={certificates}
        setImageUrls={setCertificates}
        endpoint="multipleProductsUploader"
        label="Certificates which verifies your farm is organic"
      />
      <SubmitButton
        isLoading={loading}
        buttonTitle="Register"
        loadingButtonTitle="Creating Please wait..."
      />

      {/* ... (existing links) */}
    </form>
  );
}
