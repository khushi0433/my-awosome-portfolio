"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import AnimatedBackground from "components/animated-background"
import { ExternalLink, Github, Upload, Plus } from "lucide-react"
import ProjectModal from "components/project-modal"
import { getProjects } from "lib/api"
import { useRouter } from 'next/router'

import type { Project } from "types/project"

// Define the Works component
export default function Works() {
  // State declarations
  const [projects, setProjects] = useState<import("types/project").Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<import("types/project").Project | undefined>(undefined)
  const [filter, setFilter] = useState("all")

  // Load projects on component mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true)
        const data = await getProjects()
        // Convert all project ids to string to match Project type
        const projectsWithStringIds = data.map((project: any) => ({
          ...project,
          id: String(project.id),
        }))
        setProjects(projectsWithStringIds)
      } catch (err) {
        console.error("Failed to load projects:", err)
        setError("Failed to load projects. Please try again later.")

        // Fallback data
        setProjects([
          {
            id: "1",
            title: "Personal Blog",
            description: "A responsive blog built with React and Tailwind CSS.",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["React", "Tailwind CSS", "JavaScript"],
            category: "frontend",
            liveLink: "#",
            githubLink: "#",
          },
          {
            id: "2",
            title: "E-commerce Platform",
            description: "A full-featured online store with product listings, cart, and checkout.",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["React", "Node.js", "MongoDB", "Express"],
            category: "fullstack",
            liveLink: "#",
            githubLink: "#",
          },
          {
            id: "3",
            title: "Task Manager",
            description: "A full-stack task management application with user authentication.",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["React", "Python", "Django", "API"],
            category: "fullstack",
            liveLink: "#",
            githubLink: "#",
          },
          {
            id: "4",
            title: "Portfolio Website",
            description: "A modern portfolio website template for creative professionals.",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["React", "Tailwind CSS", "Next.js"],
            category: "frontend",
            liveLink: "#",
            githubLink: "#",
          },
          {
            id: "5",
            title: "Inventory Management System",
            description: "A Django-based inventory management system for small businesses.",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["Python", "Django", "MySQL", "Bootstrap"],
            category: "backend",
            liveLink: "#",
            githubLink: "#",
          },
          {
            id: "6",
            title: "RESTful API Service",
            description: "A Python Flask API service for a mobile application.",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["Python", "Flask", "RESTful API", "JWT"],
            category: "backend",
            liveLink: "#",
            githubLink: "#",
          },
          {
            id: "7",
            title: "Data Analysis Dashboard",
            description: "A Django dashboard for visualizing and analyzing business metrics.",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["Python", "Django", "Pandas", "Chart.js"],
            category: "backend",
            liveLink: "#",
            githubLink: "#",
          },
          {
            id: "8",
            title: "Automated Testing Framework",
            description: "A Python-based testing framework for web applications.",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["Python", "Selenium", "PyTest", "CI/CD"],
            category: "backend",
            liveLink: "#",
            githubLink: "#",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  // Modal handlers
  const openModal = (project: Project | undefined = undefined) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(undefined)
  }

  // Project CRUD operations
  const handleAddProject = async (newProject: Project) => {
    try {
      // Convert id to string if present
      if (newProject.id) {
        newProject.id = String(newProject.id)
      }
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      })

      if (!response.ok) {
        throw new Error("Failed to add project")
      }

      const addedProject = await response.json()
      setProjects([...projects, addedProject])
      closeModal()
    } catch (err) {
      console.error("Error adding project:", err)
      alert("Failed to add project. Please try again.")
    }
  }

  const handleUpdateProject = async (updatedProject: Project) => {
    try {
      // Convert id to string if present
      if (updatedProject.id) {
        updatedProject.id = String(updatedProject.id)
      }
      const response = await fetch(`/api/projects/${updatedProject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      })

      if (!response.ok) {
        throw new Error("Failed to update project")
      }

      setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)))
      closeModal()
    } catch (err) {
      console.error("Error updating project:", err)
      alert("Failed to update project. Please try again.")
    }
  }

  const handleDeleteProject = async (id: number | string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      setProjects(projects.filter((p) => p.id !== id))
      closeModal()
    } catch (err) {
      console.error("Error deleting project:", err)
      alert("Failed to delete project. Please try again.")
    }
  }

  // Filter projects by category
  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  // Render component
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20">
          {/* Header section */}
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center">My Works</h1>
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700 shadow-lg mb-6">
              <Image src="/images/profile-photo.png" alt="Khushi Hassan" fill className="object-cover" />
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  filter === "all"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-800 bg-opacity-60 text-gray-300 hover:bg-gray-700"
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setFilter("frontend")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  filter === "frontend"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-800 bg-opacity-60 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Frontend
              </button>
              <button
                onClick={() => setFilter("backend")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  filter === "backend"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-800 bg-opacity-60 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Backend
              </button>
              <button
                onClick={() => setFilter("fullstack")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  filter === "fullstack"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-800 bg-opacity-60 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Full Stack
              </button>
            </div>

            {/* Add project button */}
            <button
              onClick={() => openModal()}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center transition-all"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Project
            </button>
          </div>

          {/* Content section */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900 bg-opacity-20 text-red-200 p-4 rounded-md text-center">{error}</div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-800 bg-opacity-60 rounded-xl overflow-hidden backdrop-blur-sm shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => openModal(project)}
                        className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full"
                        aria-label="Edit project"
                      >
                        <Upload className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <span className="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">
                        {project.category === "frontend"
                          ? "Frontend"
                          : project.category === "backend"
                            ? "Backend"
                            : "Full Stack"}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="bg-gray-700 text-gray-300 px-3 py-1 text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Link
                        href={project.liveLink}
                        className="flex items-center text-gray-300 hover:text-white transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live Demo
                      </Link>
                      <Link
                        href={project.githubLink}
                        className="flex items-center text-gray-300 hover:text-white transition-colors"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        Source Code
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <ProjectModal
          project={selectedProject || undefined}
          onClose={closeModal}
          onAdd={handleAddProject}
          onUpdate={handleUpdateProject}
          onDelete={handleDeleteProject}
        />
      )}
    </div>
  )
}
