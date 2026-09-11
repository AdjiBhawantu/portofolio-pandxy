import mysql from 'mysql2/promise';

declare global {
  // eslint-disable-next-line no-var
  var __dbPool: mysql.Pool | undefined;
}

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'portfolio_pandxy';

export function getDbPool(): mysql.Pool {
  if (!global.__dbPool) {
    global.__dbPool = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }
  return global.__dbPool;
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const pool = getDbPool();
  try {
    const [results] = await pool.query(sql, params);
    return results as T;
  } catch (error) {
    console.error('Database Query Error:', error);
    throw error;
  }
}
