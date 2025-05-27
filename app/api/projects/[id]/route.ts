import { NextResponse, type NextRequest } from "next/server";
import { query, initDatabase } from  "../../../../lib/db";

async function ensureDatabaseInitialized() {
  await initDatabase();
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string | string[] | null;
  category: string;
  liveLink: string;
  githubLink: string;
}

function safeParseJSON<T>(json: string | null, fallback: T): T {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
}

export async function GET(
  context: { params: { id: string }, request: NextRequest }
) {
  const { id } = context.params;
  const request = context.request;

  try {
    await ensureDatabaseInitialized();

    const [project] = (await query("SELECT * FROM projects WHERE id = ?", [
      id,
    ])) as Project[];

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Return tags as array, not stringified JSON string
    project.tags = safeParseJSON(typeof project.tags === "string" ? project.tags : null, []);

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  context: { params: { id: string }, request: NextRequest }
) {
  const { id } = context.params;
  const request = context.request;

  try {
    await ensureDatabaseInitialized();

    const data = await request.json();

    if (!data.title || !data.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const tagsJson = JSON.stringify(data.tags || []);

    await query(
      `UPDATE projects 
       SET title = ?, description = ?, image = ?, tags = ?, category = ?, liveLink = ?, githubLink = ?
       WHERE id = ?`,
      [
        data.title,
        data.description,
        data.image || "/placeholder.svg?height=600&width=800",
        tagsJson,
        data.category || "frontend",
        data.liveLink || "",
        data.githubLink || "",
        id,
      ]
    );

    const [updatedProject] = (await query("SELECT * FROM projects WHERE id = ?", [
      id,
    ])) as Project[];

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    updatedProject.tags = safeParseJSON(typeof updatedProject.tags === "string" ? updatedProject.tags : null, []);

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  context: { params: { id: string }, request: NextRequest }
) {
  const { id } = context.params;
  const request = context.request;

  try {
    await ensureDatabaseInitialized();

    const [project] = (await query("SELECT id FROM projects WHERE id = ?", [
      id,
    ])) as Project[];

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await query("DELETE FROM projects WHERE id = ?", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
