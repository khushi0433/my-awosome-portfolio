import mysql from "mysql2/promise"

// Database connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "portfolio",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Create a connection pool
const pool = mysql.createPool(dbConfig)

// Initialize database tables if they don't exist
export async function initDatabase() {
  try {
    const connection = await pool.getConnection()

    // Create projects table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
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
    `)

    // Create reviews table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        rating INT NOT NULL,
        comment TEXT NOT NULL,
        date DATE NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create contacts table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    connection.release()
    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Error initializing database:", error)
    throw error
  }
}

// Execute a query with parameters
export async function query(sql: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Get a database connection
export async function getConnection() {
  try {
    return await pool.getConnection()
  } catch (error) {
    console.error("Error getting database connection:", error)
    throw error
  }
}

// Close all connections in the pool
export async function closePool() {
  try {
    await pool.end()
  } catch (error) {
    console.error("Error closing connection pool:", error)
    throw error
  }
}
