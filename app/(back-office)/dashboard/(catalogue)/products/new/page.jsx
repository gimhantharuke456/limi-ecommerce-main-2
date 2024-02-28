import FormHeader from "@/components/backoffice/FormHeader";
import NewProductForm from "@/components/backoffice/NewProductForm";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import React from "react";

export default async function NewProduct() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const user = session?.user;
  //Categories and Farmers
  const categoriesData = await getData("categories");
  const usersData = (await getData("users")) ?? [];
  // Example loading state
  if (!categoriesData || !usersData) {
    return <div>Loading...</div>;
  }
  const farmersData = usersData?.filter((user) => user.role === "FARMER") ?? [];
  const farmers = farmersData.map((farmer) => {
    return {
      id: farmer.id,
      title: farmer.name,
    };
  });
  // console.log(farmers);
  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });
  return (
    <div>
      <FormHeader title={`Add Product`} />
      <NewProductForm
        uid={user?.id}
        categories={categories}
        farmers={farmers}
      />
    </div>
  );
}
