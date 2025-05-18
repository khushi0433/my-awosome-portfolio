# Khushi Hassan Portfolio

A clean, modern portfolio website built with Next.js, React, and Tailwind CSS. This portfolio features an animated background, a MySQL backend for data storage, and a project management system.

## Features

- Responsive design that works on all devices
- Animated particle background with canvas
- 4 main pages: Home, About, Works, and Contact
- MySQL backend for storing projects, reviews, and contact form submissions
- Project management system to easily upload and showcase work
- Project filtering by category (Frontend, Backend, Full Stack)
- Review system where visitors can leave feedback
- Clean, modern UI with a gray color scheme
- Social media links (GitHub, LinkedIn, Upwork)
- Fully accessible and SEO-friendly

## Technologies Used

### Frontend
- **Next.js**: For server-side rendering and routing
- **React**: For building the user interface
- **Tailwind CSS**: For styling
- **TypeScript**: For type safety
- **Canvas API**: For the animated background

### Backend
- **Next.js API Routes**: For backend API endpoints
- **MySQL**: For database storage
- **mysql2**: For MySQL connection from Node.js

## Database Schema

The application uses three main tables:

### Projects Table
\`\`\`sql
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255),
  tags JSON,
  category VARCHAR(50) DEFAULT 'frontend',
  liveLink VARCHAR(255),
  githubLink VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
\`\`\`

### Reviews Table
\`\`\`sql
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rating INT NOT NULL,
  comment TEXT NOT NULL,
  date DATE NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
\`\`\`

### Contacts Table
\`\`\`sql
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
\`\`\`

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/[id]` - Get a specific project
- `PUT /api/projects/[id]` - Update a project
- `DELETE /api/projects/[id]` - Delete a project

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create a new review

### Contact
- `POST /api/contact` - Submit a contact form

## Setup and Installation

### Prerequisites
- Node.js 14.x or higher
- MySQL 5.7 or higher

### Environment Variables
Create a `.env.local` file in the root directory with the following variables:
\`\`\`
MYSQL_HOST=localhost
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=portfolio
\`\`\`

### Installation Steps
1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Set up the MySQL database:
   \`\`\`bash
   mysql -u root -p
   CREATE DATABASE portfolio;
   \`\`\`
4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project can be easily deployed to Vercel:

\`\`\`bash
npm run build
\`\`\`

Then deploy using the Vercel CLI or GitHub integration.

## Future Improvements

- Add authentication for admin access to manage projects
- Implement image upload to cloud storage
- Add a blog section
- Implement dark/light mode toggle
- Add more interactive elements
- Add a downloadable resume feature
