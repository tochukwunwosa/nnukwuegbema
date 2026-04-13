import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib";
import { Kindred } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();

    const kindreds = await db
      .collection<Kindred>("kindreds")
      .find({})
      .sort({ name: 1 })
      .toArray();

    return NextResponse.json(kindreds, { status: 200 });
  } catch (error) {
    console.error("Error fetching kindreds:", error);
    return NextResponse.json(
      { error: "Failed to fetch kindreds" },
      { status: 500 },
    );
  }
}
