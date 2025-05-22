import { NextResponse } from "next/server";
import { initDatabase } from "lib/db";

export async function GET() {
  try {
    await initDatabase();
    return NextResponse.json({ success: true, message: "Database connection successful" });
  } catch (error) {
    console.error("Database connection test failed:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Database connection failed", 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
