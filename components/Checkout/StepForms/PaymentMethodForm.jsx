"use client";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { Circle, CreditCard, HeartHandshake, Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "@/redux/slices/checkoutSlice";
import SimpleModal from "simple-react-modal";

export default function PaymentMethodForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const existingFormData = useSelector(
    (store) => store.checkout.checkoutFormData
  );

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...existingFormData,
    },
  });
  const initialPaymentMethod = existingFormData.paymentMethod || "";
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);
  console.log(paymentMethod);
  async function processData(data) {
    data.paymentMethod = paymentMethod;
    console.log(data);
    //Update the checkout Data
    dispatch(updateCheckoutFormData(data));
    //Update the Current Step
    dispatch(setCurrentStep(currentStep + 1));
  }

  const openCardModal = () => {
    setIsCardModalOpen(true);
  };

  const closeCardModal = () => {
    setIsCardModalOpen(false);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const submitCardDetails = () => {
    // You can add further validation or processing here
    console.log("Card details submitted:", cardDetails);
    closeCardModal(); // Close the modal after submission
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Payment Method
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* Payment method Cost */}
        <div className="col-span-full">
          <h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Which Payment Method do You Prefer ?
          </h3>
          <ul class="grid w-full gap-6 md:grid-cols-2 justify-center items-center">
            <li>
              <input
                type="radio"
                id="hosting-small"
                name="hosting"
                value="Cash On Delivery"
                className="hidden peer"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label
                for="hosting-small"
                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                style={{
                  backgroundColor:
                    paymentMethod == "Cash On Delivery"
                      ? "black"
                      : "transparent",
                }}
              >
                {/* Design */}
                <div className="flex gap-2 items-center">
                  <HeartHandshake className="w-8 h-8 ms-3 flex-shrink-0 " />
                  <p>Cash On Delivery</p>
                </div>
                <Circle className="w-5 h-5 ms-3 flex-shrink-0" />
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="hosting-big"
                name="hosting"
                value="Credit Card"
                class="hidden peer"
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setIsCardModalOpen(true);
                }}
              />
              <label
                for="hosting-big"
                style={{
                  backgroundColor:
                    paymentMethod == "Credit Card" ? "black" : "transparent",
                }}
                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex gap-2 items-center">
                  <CreditCard className="w-8 h-8 ms-3 flex-shrink-0 " />
                  <p>Credit Card</p>
                </div>
                <Circle className="w-5 h-5 ms-3 flex-shrink-0" />
              </label>
            </li>
          </ul>
        </div>
      </div>
      <NavButtons />
      <SimpleModal
        show={isCardModalOpen}
        onClose={closeCardModal}
        width="500px"
        height="auto"
      >
        <div className="p-8">
          <h2 className="text-lg font-semibold mb-4 dark:text-lime-400">
            Enter Card Details
          </h2>
          {/* Input fields for card details */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cardNumber"
            >
              Card Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cardNumber"
              name="cardNumber"
              type="text"
              value={cardDetails.cardNumber}
              onChange={handleCardDetailsChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="expirationDate"
            >
              Expiration Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expirationDate"
              name="expirationDate"
              type="text"
              value={cardDetails.expirationDate}
              onChange={handleCardDetailsChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cvv"
            >
              CVV
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cvv"
              name="cvv"
              type="text"
              value={cardDetails.cvv}
              onChange={handleCardDetailsChange}
            />
          </div>
          {/* Submit button */}
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded mt-4"
            onClick={submitCardDetails}
          >
            Submit
          </button>
        </div>
      </SimpleModal>
    </form>
  );
}
