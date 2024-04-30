"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SpendingOverTimeChart = ({ orders }) => {
  const spendingData = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    acc[date] =
      (acc[date] || 0) +
      order.orderItems.reduce((sum, item) => sum + item.price, 0);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(spendingData),
    datasets: [
      {
        label: "Total Spending",
        data: Object.values(spendingData),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ width: 500, height: 500 }}>
      <h3>Spending Over Time</h3>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: { legend: { position: "bottom" } },
        }}
      />
    </div>
  );
};

export default SpendingOverTimeChart;
