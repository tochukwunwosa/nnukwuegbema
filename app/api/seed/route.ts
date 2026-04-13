import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

const communities = [
  "Umuenukposi",
  "Umuacha",
  "Umuchiegbu",
  "Umuezenna",
  "Umuezeani",
  "Umuemeochu",
];

export async function GET() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("nnukwuegbema");
    const collection = db.collection("kindreds");
    await db.collection("kindreds").createIndex({ name: 1 }, { unique: true });

    // Ensure no duplicates at DB level
    await collection.createIndex({ name: 1 }, { unique: true });

    for (const name of communities) {
      await collection.updateOne(
        { name },
        {
          $setOnInsert: {
            name,
            createdAt: new Date(),
          },
        },
        { upsert: true },
      );
    }

    return Response.json({
      message: "✅ Seeding completed successfully",
    });
  } catch (error) {
    return Response.json({
      error: "❌ Seeding failed",
      details: error,
    });
  } finally {
    await client.close();
  }
}
