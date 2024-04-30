import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import OrdersByStatusChart from "./OrdersByStatusChart";
import SpendingOverTimeChart from "./SpendingOverTimeChart";

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  let userOrders = [];
  let orderCount = 0;
  let totalSpend = 0;
  const orders = await getData("orders");

  if (user) {
    const userInfo = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });
    userOrders = orders.filter((order) => order?.userId === userInfo.id);
    console.log(JSON.stringify(userOrders));
    userOrders?.forEach((order) => {
      order?.orderItems?.forEach((order) => {
        totalSpend += order.price;
      });
    });
    orderCount = userOrders.length;
  }

  return (
    <div>
      <h2>Welcome, {user?.name || "User"}</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            marginTop: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "#003366", // Dark blue color
              color: "white",
              padding: 20,
              width: 300,
              borderRadius: 8,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <h3>Total Orders</h3>
            <p style={{ fontSize: 32, fontWeight: "bold" }}> {orderCount}</p>
          </div>
          <div
            style={{
              backgroundColor: "#003366", // Dark blue color
              color: "white",
              padding: 20,
              width: 300,
              borderRadius: 8,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <h3>Total Spent</h3>
            <p style={{ fontSize: 32, fontWeight: "bold" }}>
              {" "}
              LKR {totalSpend.toFixed(2)}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", padding: 32 }}>
          <OrdersByStatusChart orders={userOrders} />
          <SpendingOverTimeChart orders={userOrders} />
        </div>
      </div>
    </div>
  );
}
