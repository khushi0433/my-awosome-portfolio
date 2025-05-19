import { NextResponse } from "next/server";
import { query, initDatabase } from "../../../lib/db";

export async function GET() {
  try {
    // Initialize the database (ensure it's done for every request in serverless environments)
    await initDatabase();

    // Fetch projects from the database
    const projects = (await query("SELECT * FROM projects ORDER BY createdAt DESC")) as Project[];

    // Format the projects
    const formattedProjects = projects.map((project) => ({
      ...project,
      tags: safeParseJSON(project.tags, []), // Safely parse tags
    }));

    // Return the formatted projects as JSON
    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching projects. Please try again later." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Initialize the database
    await initDatabase();

    const body = await request.json();

    const result = await query(
      "INSERT INTO projects (name, description, tags, createdAt) VALUES (?, ?, ?, ?)",
      [body.name, body.description, JSON.stringify(body.tags), new Date()]
    );

    const insertId = (result as any)?.insertId;

    if (!insertId) {
      throw new Error("Failed to retrieve the insertId from the database response.");
    }

  
    return NextResponse.json({ success: true, id: insertId });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the project. Please try again later." },
      { status: 500 }
    );
  }
}

function safeParseJSON<T>(json: string | null, fallback: T): T {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
}

interface Project {
  id: number;
  name: string;
  description: string;
  tags: string | null;
  createdAt: string;
}