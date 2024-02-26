import FarmerRegisterForm from "@/components/frontend/FarmerRegistrationForm";

import React from "react";

export default async function Page() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-12 py-8 mx-auto md:h-screen lg:py-12">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-2xl dark:border px-12 py-6 md:mt-0 sm:max-w-3xl xl:p-12 dark:bg-gray-800 dark:border-gray-700 max-h-[800px] overflow-y-auto scrollbar-hidden">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold  leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Complete your Account
            </h1>
          </div>
          <FarmerRegisterForm role="FARMER" />
        </div>
      </div>
    </section>
  );
}
