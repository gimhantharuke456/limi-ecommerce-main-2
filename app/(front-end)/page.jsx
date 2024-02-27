import CategoryList from "@/components/frontend/CategoryList";
import CommunityTrainings from "@/components/frontend/CommunityTrainings";
import Hero from "@/components/frontend/Hero";
import MarketList from "@/components/frontend/MarketList";
import { getData } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
export default async function Home() {
  const categoriesData = await getData("categories");
  const categories = categoriesData.filter((category) => {
    return category.products.length > 3;
  });

  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) return redirect("/login");
  const userInfo = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (userInfo != null) {
    if (userInfo?.role == "FARMER") {
      const farm = await db.farm.findFirst({
        where: {
          ownedBy: userInfo?.id,
        },
      });
      if (!farm) {
        if (!userInfo?.emailVerified) {
          redirect("/register-farmer/" + userInfo?.id);
        }
      } else {
        return (
          <div className="min-h-screen flex justify-center items-center">
            <h1>Please wait your farm is not accepted yet</h1>
          </div>
        );
      }
    }
  }
  return (
    <div className="min-h-screen">
      <Hero />
      <MarketList />

      {categories.map((category, i) => {
        return (
          <div className="py-8" key={i}>
            <CategoryList isMarketPage={false} category={category} />
          </div>
        );
      })}

      <CommunityTrainings />
      {/* <h2 className="text-4xl">Welcome to Limi Ecommerce </h2>

      <Link className="my-4 underline " href="/register-farmer">
        Become a farmer /Vendor/Supplier
      </Link> */}
    </div>
  );
}
