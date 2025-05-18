// API functions for interacting with the backend

// Projects API
export async function getProjects() {
  try {
    const response = await fetch("/api/projects")
    if (!response.ok) {
      throw new Error("Failed to fetch projects")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching projects:", error)
    throw error
  }
}

export async function getProjectById(id: string) {
  try {
    const response = await fetch(`/api/projects/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch project")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching project:", error)
    throw error
  }
}

// Reviews API
export async function getReviews() {
  try {
    const response = await fetch("/api/reviews")
    if (!response.ok) {
      throw new Error("Failed to fetch reviews")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching reviews:", error)
    throw error
  }
}

export async function addReview(reviewData: any) {
  try {
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })

    if (!response.ok) {
      throw new Error("Failed to add review")
    }

    return await response.json()
  } catch (error) {
    console.error("Error adding review:", error)
    throw error
  }
}

// Contact form API
export async function submitContactForm(formData: any) {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error("Failed to submit contact form")
    }

    return await response.json()
  } catch (error) {
    console.error("Error submitting contact form:", error)
    throw error
  }
}
