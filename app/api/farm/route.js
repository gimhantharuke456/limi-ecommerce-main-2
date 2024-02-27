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
    const { id } = request.params;

    const farm = await db.farm.findUnique({
      where: {
        ownedBy: id,
      },
    });

    if (!farm) {
      return NextResponse.json(
        {
          message: "Farm not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(farm);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to fetch farm",
        error,
      },
      { status: 500 }
    );
  }
}
export async function GET_FARM_BY_ID(request) {
  try {
    const { id } = request.params;

    const farm = await db.farm.findUnique({
      where: {
        id,
      },
    });

    if (!farm) {
      return NextResponse.json(
        {
          message: "Farm not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(farm);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to fetch farm",
        error,
      },
      { status: 500 }
    );
  }
}
