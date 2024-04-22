// pages/api/dashboard.js

import prisma from "../../lib/prisma"; // Adjust the import path as needed

export default async function handler(req, res) {
  // Fetch data from your database
  const salesData = await prisma.sale.findMany({
    // Add your query parameters as needed
  });
  // Return the data as JSON
  res.json(salesData);
}
