export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    throw new Error('Failed to submit contact form');
  }
}

export async function getProjects() {
  const response = await fetch('/api/projects');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

export async function getReviews() {
  const response = await fetch('/api/reviews');
  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }
  return response.json();
}

export async function addReview(review: {
  name: string;
  rating: number;
  comment: string;
  date?: string;
}) {
  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  });

  if (!response.ok) {
    throw new Error('Failed to add review');
  }
  return response.json();
}
