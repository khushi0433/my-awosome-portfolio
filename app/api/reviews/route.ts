export const dynamic = "force-static";

import { NextResponse } from "next/server";
import { query, initDatabase } from "../../../lib/db";
import { handleError } from "../../../lib/errorHandler";

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
    const { status, body } = handleError(error, "Error fetching reviews:");
    return NextResponse.json(body, { status });
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
    const { status, body } = handleError(error, "Error creating review:");
    return NextResponse.json(body, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!dbInitialized) {
      await initDatabase();
      dbInitialized = true;
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Review id is required" }, { status: 400 });
    }

    await query("DELETE FROM reviews WHERE id = ?", [id]);

    return NextResponse.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    const { status, body } = handleError(error, "Error deleting review:");
    return NextResponse.json(body, { status });
  }
}
