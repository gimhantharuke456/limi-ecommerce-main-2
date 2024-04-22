"use client";
import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const OrderChart = ({ orders, title, chartTitle }) => {
  const [isBarChart, setIsBarChart] = useState(false);
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Filter orders to include only those within the last week
    const recentOrders = orders?.filter(
      (order) => new Date(order.createdAt) >= oneWeekAgo
    );
    const orderCounts = recentOrders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Sort dates and get labels and data
    const sortedDates = Object.keys(orderCounts).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    const countsData = sortedDates.map((date) => orderCounts[date]);

    setChartData({
      labels: sortedDates,
      datasets: [
        {
          label: { chartTitle },
          data: countsData,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    });
    setChartOptions({
      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          title: {
            display: true,
            text: "Number of Orders",
          },
          beginAtZero: true,
          ticks: {
            // This will ensure that only integers are displayed
            precision: 0,
            stepSize: 1, // Adjust stepSize as necessary for your data
          },
        },
      },

      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Daily Orders",
        },
        maintainAspectRatio: false,
        responsive: true,
      },
    });
  }, [orders]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#1E293B",
        borderRadius: 12,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: 32 }}>{title}</h1>
      <hr />
      <div className="flex items-center justify-end mb-4">
        <label class="inline-flex items-center mb-5 cursor-pointer">
          <input
            onChange={() => {
              setIsBarChart(!isBarChart);
            }}
            type="checkbox"
            value=""
            class="sr-only peer"
          />
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Bar Chart
          </span>
        </label>
      </div>
      {isBarChart ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default OrderChart;
