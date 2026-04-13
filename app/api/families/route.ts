import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Family } from "@/types";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const kindredId = searchParams.get("kindredId");
    const familyName = searchParams.get("familyName");

    if (!kindredId || !familyName) {
      return NextResponse.json(
        { error: "Missing kindredId or familyName" },
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();

    const family = await db.collection<Family>("families").findOne({
      kindredId: kindredId,
      familyName: { $regex: `^${familyName}$`, $options: "i" }, // Case-insensitive exact match
    });

    if (!family) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(family, { status: 200 });
  } catch (error) {
    console.error("Error searching families:", error);
    return NextResponse.json(
      { error: "Failed to search families" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kindredId, kindredName, ...familyData } = body;

    if (!kindredId || !familyData.familyName) {
      return NextResponse.json(
        { error: "Missing kindredId or familyName" },
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();

    // Check if family already exists
    const existingFamily = await db.collection<Family>("families").findOne({
      kindredId: kindredId,
      familyName: { $regex: `^${familyData.familyName}$`, $options: "i" },
    });

    if (existingFamily) {
      return NextResponse.json(
        { error: "Family already exists in this kindred" },
        { status: 409 },
      );
    }

    // Create new family
    const newFamily: Family = {
      kindredId: kindredId,
      kindredName: kindredName,
      familyName: familyData.familyName,
      alternativeNames: familyData.alternativeNames || "",
      foundedYear: familyData.foundedYear || "",
      originLocation: familyData.originLocation || "",
      familyDescription: familyData.familyDescription || "",
      notableAchievements: familyData.notableAchievements || "",
      members: familyData.familyMembers || [],
      submissions: [
        {
          submittedBy: familyData.submitterName,
          submitterRelation: familyData.submitterRelation,
          submitterContact: familyData.submitterContact,
          submitterDate: familyData.submitterDate,
          changedFields: Object.keys(familyData),
          versionNumber: 1,
          additionalNotes: familyData.additionalNotes || "",
          submittedAt: new Date(),
        },
      ],
      lastUpdated: new Date(),
      versionNumber: 1,
      status: "active",
    };

    const result = await db.collection<Family>("families").insertOne(newFamily);

    return NextResponse.json(
      { _id: result.insertedId, ...newFamily },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating family:", error);
    return NextResponse.json(
      { error: "Failed to create family" },
      { status: 500 },
    );
  }
}
