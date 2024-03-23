import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroCarousel from "./HeroCarousel";
import advert from "../../public/adv.gif";
import { CircleDollarSign, FolderSync, HelpCircle } from "lucide-react";
import SidebarCategories from "./SidebarCategories";
import { getData } from "@/lib/getData";

export default async function Hero() {
  const banners = await getData("banners");
  const categoriesData = await getData("categories");
  // Only categories with Products
  const categories = categoriesData.filter(
    (category) => category.products.length > 0
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {categories.length > 0 &&
          categories.map((category, i) => {
            return (
              <Link
                key={i}
                href={`/category/${category.slug}`}
                style={{
                  display: "inline-flex",
                  height: 50,
                  backgroundColor: "#374151 ",
                  width: 200,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 4,
                }}
                className="flex items-center gap-3 hover:bg-slate-50 duration-300 transition-all dark:text-slate-300 dark:hover:bg-slate-600 rounded-md"
              >
                <span className="text-sm">{category.title}</span>
              </Link>
            );
          })}
      </div>
      <div className="grid grid-cols-12 gap-8 mb-6 ">
        {/* <SidebarCategories /> */}
        <div className="col-span-full sm:col-span-12 bg-blue-600 rounded-md">
          <HeroCarousel banners={banners} />
        </div>
      </div>
      <div className="col-span-2 hidden sm:block bg-white p-3 dark:bg-slate-800 rounded-lg">
        <Link href="/community" className="flex items-center space-x-1 mb-3">
          <HelpCircle className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900" />
          <div className="flex flex-col">
            <h2 className="uppercase text-sm">GREEN HARVEST COMMUNITY </h2>
            <p className="text-[0.6rem]">Community</p>
          </div>
        </Link>
        <Link href="#" className="flex items-center space-x-1 mb-3">
          <FolderSync className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900" />
          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Easy Return</h2>
            <p className="text-[0.6rem]">Quick Return</p>
          </div>
        </Link>
        <Link
          href="/register-farmer"
          className="flex items-center space-x-1 mb-6"
        >
          <CircleDollarSign className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900" />
          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Sell on Green Harvest </h2>
            <p className="text-[0.6rem]">Million of Vistors</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
