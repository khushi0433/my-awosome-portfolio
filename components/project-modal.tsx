"use client"

import { useState, useEffect } from "react"
import { X, Upload, Trash } from "lucide-react"
import Image from "next/image"

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category?: string;
  liveLink: string;
  githubLink: string;
}

interface ProjectModalProps {
  project?: Project;
  onClose: () => void;
  onAdd: (project: Project) => void;
  onUpdate: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectModal({ project, onClose, onAdd, onUpdate, onDelete }: ProjectModalProps) {
  const [formData, setFormData] = useState<{
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
    liveLink: string;
    githubLink: string;
  }>({
    id: "",
    title: "",
    description: "",
    image: "/placeholder.svg?height=600&width=800",
    tags: [],
    category: "frontend",
    liveLink: "",
    githubLink: "",
  })

  const [currentTag, setCurrentTag] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    if (project) {
      setFormData({
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image,
        tags: [...project.tags],
        category: project.category || "frontend",
        liveLink: project.liveLink,
        githubLink: project.githubLink,
      })
    }
  }, [project])

  interface HandleChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: HandleChangeEvent): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(currentTag.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, currentTag.trim()],
        }))
      }
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string): void => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  interface HandleImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  interface HandleImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & {
      files: FileList;
    };
  }
  
  const handleImageChange = (e: HandleImageChangeEvent): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const target = e.target;
        if (target && target.result) {
          setPreviewImage(target.result.toString());
          
          if (typeof target.result === "string") {
            setFormData((prev) => ({ ...prev, image: target.result as string }));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = (e: HandleSubmitEvent): void => {
    e.preventDefault()
    if (project) {
      onUpdate(formData)
    } else {
      onAdd(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">{project ? "Edit Project" : "Add New Project"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white resize-none"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Full Stack</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Project Image</label>
              <div className="flex items-center space-x-4">
                <div className="relative h-24 w-24 rounded-md overflow-hidden bg-gray-700">
                  <Image src={previewImage || formData.image} alt="Project preview" fill className="object-cover" />
                </div>
                <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                Tags (Press Enter to add)
              </label>
              <input
                type="text"
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
                placeholder="e.g. React, JavaScript, etc."
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-700 text-gray-300 px-3 py-1 text-sm rounded-full flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-gray-400 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="liveLink" className="block text-sm font-medium text-gray-300 mb-1">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  id="liveLink"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label htmlFor="githubLink" className="block text-sm font-medium text-gray-300 mb-1">
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  id="githubLink"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            {project && (
              <button
                type="button"
                onClick={() => onDelete(project.id)}
                className="bg-red-900 hover:bg-red-800 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Project
              </button>
            )}
            <div className="flex space-x-4 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center"
              >
                <Upload className="mr-2 h-4 w-4" />
                {project ? "Update Project" : "Add Project"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
