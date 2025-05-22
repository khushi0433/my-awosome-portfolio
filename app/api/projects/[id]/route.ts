import { NextResponse, NextRequest } from "next/server"
import { query, initDatabase } from "@/lib/db"

let dbInitialized = false

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!dbInitialized) {
      await initDatabase()
      dbInitialized = true
    }

    const { id } = params

    const [project] = (await query("SELECT * FROM projects WHERE id = ?", [id])) as any[]


    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    project.tags = JSON.parse(project.tags || "[]")

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!dbInitialized) {
      await initDatabase()
      dbInitialized = true
    }

    const { id } = params
    const data = await request.json()

    if (!data.title || !data.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    const tagsJson = JSON.stringify(data.tags || [])

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
      ],
    )

    const [updatedProject] = (await query("SELECT * FROM projects WHERE id = ?", [id])) as any[]

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    updatedProject.tags = JSON.parse(updatedProject.tags || "[]")

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!dbInitialized) {
      await initDatabase()
      dbInitialized = true
    }

    const { id } = params

    const [project] = (await query("SELECT id FROM projects WHERE id = ?", [id])) as any[]


    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    await query("DELETE FROM projects WHERE id = ?", [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}