/**
 * @file index.ts
 * @path /db/index.ts
 * @description Standard PostgreSQL connection pool using the pg driver.
 */

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
export default pool;