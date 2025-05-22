import mysql from "mysql2/promise";

let connection: mysql.Connection | null = null;

export async function initDatabase() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "portfolio",
    });
  }
}

export async function query(sql: string, params?: any[]) {
  if (!connection) {
    await initDatabase();
  }
  if (!connection) {
    throw new Error("Database connection not initialized");
  }
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
