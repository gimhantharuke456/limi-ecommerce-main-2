import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const farm = await db.farm.findFirst({
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
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch farm",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const { isVerified } = await request.json();
    console.log(isVerified);
    const existingFarm = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingFarm) {
      return NextResponse.json(
        {
          data: null,
          message: `User with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    const updatedFarm = await db.user.update({
      where: { id },
      data: {
        emailVerified: true,
      },
    });

    return NextResponse.json(updatedFarm);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to update farmer",
        error,
      },
      { status: 500 }
    );
  }
}
