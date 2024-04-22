import React from "react";
import TopCard from "../dashboard/TopCard";
import { getData } from "@/lib/getData";
import OrderChart from "../dashboard/OrderChart";

export default async function FarmerDashboard() {
  const customers = await getData("customers");
  const orders = await getData("orders");
  const markets = await getData("sales");

  return (
    <div>
      <h2>Summary</h2>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: 200,
          gap: 16,
        }}
      >
        <TopCard
          title={"Orders"}
          subtitle={orders?.length}
          icon={"assets/order_icon.svg"}
        />
        <TopCard
          title={"Customers"}
          subtitle={customers?.length}
          icon={"assets/user_icon.svg"}
        />
        <TopCard
          title={"Sales"}
          subtitle={markets?.length}
          icon={"assets/menu_icon.svg"}
        />
      </div>
      <div style={{ height: 15 }}></div>
      <div style={{ height: 500, width: "100%", display: "flex", gap: 8 }}>
        <div style={{ flex: 1, height: "100%" }}>
          {orders && (
            <OrderChart
              orders={orders}
              title={"Weekly Orders"}
              chartTitle={"Number of orders"}
            />
          )}
        </div>
        <div style={{ flex: 1, height: "100%" }}>
          <OrderChart
            orders={customers}
            title={"Weekly Customers"}
            chartTitle={"Number of customers"}
          />
        </div>
      </div>
    </div>
  );
}
