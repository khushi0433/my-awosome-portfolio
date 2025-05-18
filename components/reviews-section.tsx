"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Star, Send } from "lucide-react"
import { getReviews, addReview } from "@/lib/api"

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true)
        const data = await getReviews()
        setReviews(data)
      } catch (err) {
        console.error("Failed to load reviews:", err)
        setError("Failed to load reviews. Please try again later.")
        // Fallback to sample reviews if API fails
        setReviews([
          {
            id: "1",
            name: "John Doe",
            rating: 5,
            comment: "Excellent work! The website exceeded my expectations. Very professional and responsive.",
            date: "2023-04-15",
          },
          {
            id: "2",
            name: "Jane Smith",
            rating: 4,
            comment:
              "Great developer to work with. Delivered the project on time and was very communicative throughout the process.",
            date: "2023-03-22",
          },
          {
            id: "3",
            name: "Michael Johnson",
            rating: 5,
            comment: "Impressive skills and attention to detail. Would definitely recommend and work with again!",
            date: "2023-02-10",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewReview((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const currentDate = new Date().toISOString().split("T")[0]

      const reviewData = {
        ...newReview,
        date: currentDate,
      }

      const addedReview = await addReview(reviewData)

      setReviews((prev) => [addedReview, ...prev])

      setSubmitStatus({
        success: true,
        message: "Your review has been submitted successfully!",
      })

      // Reset form
      setNewReview({
        name: "",
        rating: 5,
        comment: "",
      })

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 3000)
    } catch (error) {
      console.error("Error submitting review:", error)
      setSubmitStatus({
        success: false,
        message: "Failed to submit review. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-900 bg-opacity-20 text-red-200 p-4 rounded-md text-center">{error}</div>
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-800 bg-opacity-60 p-6 rounded-xl backdrop-blur-sm shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg text-white">{review.name}</h3>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-400">{review.date}</span>
            </div>
            <p className="text-gray-300">{review.comment}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 bg-opacity-60 p-6 rounded-xl backdrop-blur-sm shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">Leave a Review</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newReview.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingChange(rating)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      rating <= newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">
              Your Review
            </label>
            <textarea
              id="comment"
              name="comment"
              value={newReview.comment}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center">
                <Send className="mr-2 h-4 w-4" />
                Submit Review
              </span>
            )}
          </button>

          {submitStatus && (
            <div
              className={`p-3 rounded-md mt-4 ${submitStatus.success ? "bg-green-900 bg-opacity-50 text-green-200" : "bg-red-900 bg-opacity-50 text-red-200"}`}
            >
              {submitStatus.message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
