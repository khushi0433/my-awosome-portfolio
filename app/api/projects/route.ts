import { NextResponse } from "next/server"
import { query, initDatabase } from "@/lib/db"

let dbInitialized = false

export async function GET() {
  try {
    if (!dbInitialized) {
      await initDatabase()
      dbInitialized = true
    }

    const projects = (await query("SELECT * FROM projects ORDER BY createdAt DESC")) as any[]

    const formattedProjects = projects.map((project) => ({
      ...project,
      tags: JSON.parse(project.tags || "[]"),
    }))

    return NextResponse.json(formattedProjects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    if (!dbInitialized) {
      await initDatabase()
      dbInitialized = true
    }

    const data = await request.json()

    if (!data.title || !data.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    const tagsJson = JSON.stringify(data.tags || [])

    const result = await query(
      `INSERT INTO projects (title, description, image, tags, category, liveLink, githubLink)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.title,
        data.description,
        data.image || "/placeholder.svg?height=600&width=800",
        tagsJson,
        data.category || "frontend",
        data.liveLink || "",
        data.githubLink || "",
      ],
    )


    const insertedId = (result as any).insertId
    const [insertedProject] = (await query("SELECT * FROM projects WHERE id = ?", [insertedId])) as any[]


    insertedProject.tags = JSON.parse(insertedProject.tags || "[]")

    return NextResponse.json(insertedProject, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
