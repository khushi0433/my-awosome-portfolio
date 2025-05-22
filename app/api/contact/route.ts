import { NextResponse } from "next/server";
import { query, initDatabase } from "lib/db";

let dbInitialized = false;

export async function POST(request: Request) {
  try {
    if (!dbInitialized) {
      await initDatabase();
      dbInitialized = true;
    }

    const data = await request.json();

    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    await query(
      `INSERT INTO contacts (name, email, subject, message)
       VALUES (?, ?, ?, ?)`,
      [data.name, data.email, data.subject, data.message]
    );

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 });
  }
}
