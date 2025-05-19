
import { NextResponse } from "next/server";
import { query, initDatabase } from "../../../lib/db";

let dbInitialized = false;

export async function GET() {
  try {
    if (!dbInitialized) {
      await initDatabase();
      dbInitialized = true;
    }

    const reviews = await query("SELECT * FROM reviews ORDER BY createdAt DESC");
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!dbInitialized) {
      await initDatabase();
      dbInitialized = true;
    }

    const data = await request.json();

    if (!data.name || !data.comment || !data.rating) {
      return NextResponse.json({ error: "Name, comment, and rating are required" }, { status: 400 });
    }

    const rating = Number.parseInt(data.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const result = await query(
      `INSERT INTO reviews (name, rating, comment, date)
       VALUES (?, ?, ?, ?)`,
      [data.name, rating, data.comment, data.date || new Date().toISOString().split("T")[0]],
    );

    const insertedId = (result as any).insertId;
    const [insertedReview] = (await query("SELECT * FROM reviews WHERE id = ?", [insertedId])) as any[];

    return NextResponse.json(insertedReview, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}