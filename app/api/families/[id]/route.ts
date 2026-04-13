import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Family } from "@/types";
import { ObjectId } from "mongodb";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: Context) {
  try {
     const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Family ID is required" },
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();

    const family = await db
      .collection<Family>("families")
      .findOne({ _id: new ObjectId(id) });

    if (!family) {
      return NextResponse.json({ error: "Family not found" }, { status: 404 });
    }

    return NextResponse.json(family);
  } catch (error) {
    console.error("Error fetching family:", error);
    return NextResponse.json(
      { error: "Failed to fetch family" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Family ID is required" },
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();

    const existingFamily = await db
      .collection<Family>("families")
      .findOne({ _id: new ObjectId(id) });

    if (!existingFamily) {
      return NextResponse.json({ error: "Family not found" }, { status: 404 });
    }

    const updatedMembers = [
      ...existingFamily.members,
      ...(body.familyMembers || []),
    ];

    const newSubmission = {
      submittedBy: body.submitterName,
      submitterRelation: body.submitterRelation,
      submitterContact: body.submitterContact,
      submitterDate: body.submitterDate,
      changedFields: ["members"],
      versionNumber: existingFamily.versionNumber + 1,
      additionalNotes: body.additionalNotes || "",
      submittedAt: new Date(),
    };

    const result = await db.collection<Family>("families").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          members: updatedMembers,
          lastUpdated: new Date(),
          versionNumber: existingFamily.versionNumber + 1,
          familyDescription:
            body.familyDescription || existingFamily.familyDescription,
          notableAchievements:
            body.notableAchievements || existingFamily.notableAchievements,
        },
        $push: {
          submissions: newSubmission,
        },
      },
      { returnDocument: "after" },
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating family:", error);
    return NextResponse.json(
      { error: "Failed to update family" },
      { status: 500 },
    );
  }
}
