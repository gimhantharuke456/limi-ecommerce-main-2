// api/farm.js

import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      farmName,
      address,
      farmImages,
      contactDetails,
      organicCertificates,
      ownedBy,
    } = await request.json();

    const newFarm = await db.farm.create({
      data: {
        farmName,
        address,
        farmImages,
        contactDetails,
        organicCertificates,
        ownedBy,
      },
    });

    console.log(newFarm);
    return NextResponse.json(newFarm);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to create Farm",
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const farms = await db.farm.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(farms);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Farms",
        error,
      },
      { status: 500 }
    );
  }
}
