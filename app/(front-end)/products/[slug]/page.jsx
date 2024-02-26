import AddToCartButton from "@/components/frontend/AddToCartButton";
import Breadcrumb from "@/components/frontend/Breadcrumb";
import CategoryCarousel from "@/components/frontend/CategoryCarousel";
import { getData } from "@/lib/getData";
import { BaggageClaim, Minus, Plus, Send, Share2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ProductDetailPage({ params: { slug } }) {
  const product = await getData(`products/product/${slug}`);
  const { id } = product;
  const catId = product.categoryId;
  const category = await getData(`categories/${catId}`);
  const categoryProducts = category.products;
  const products = categoryProducts.filter((product) => product.id !== id);
  return (
    <div>
      <Breadcrumb />
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={556}
            height={5556}
            className="w-full"
          />
        </div>
        <div className="col-span-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl lg:text-3xl font-semibold">
              {product.title}
            </h2>
          </div>
          <div className="border-b border-gray-500">
            <p className="py-2 ">{product.description}</p>
            <div className="flex items-center gap-8 mb-4">
              <p>SKU: {product.sku}</p>
              <p className="bg-lime-200 py-1.5 px-4 rounded-full text-slate-900 ">
                <b>Stock</b>: {`${product.productStock} ${product.unit}`}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 pt-4 border-b border-gray-500 pb-4">
            <div className="flex items-center gap-4">
              <h4 className="text-2xl">LKR{product.salePrice}</h4>
              <del className="text-slate-400 text-sm">
                LKR {product.productPrice}
              </del>
            </div>
            <p className="flex items-center">
              <Tag className="w-5 h-5 text-slate-400 me-2" />
              <span>
                Save {(product.productPrice - product.salePrice) / 100}% right
                now
              </span>
            </p>
          </div>
          <div className="flex justify-between items-center py-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-700 my-8 rounded-xl p-4">
        <h2 className="mb-4 text-xl font-semibold text-slate-200 ml-3">
          Similar Products
        </h2>
        <CategoryCarousel products={products} />
      </div>
    </div>
  );
}
