import { NextResponse } from "next/server";
import { query, initDatabase } from "lib/db";


let dbInitialized = false;

export async function GET() {
  try {
    if (!dbInitialized) {
      await initDatabase();
      dbInitialized = true;
    }

    const projects = (await query("SELECT * FROM projects")) as any[];


    projects.forEach((project) => {
      project.tags = JSON.parse(project.tags || "[]");
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
