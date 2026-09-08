// 1. Connect to PostgreSQL
// 2. Create a migrations table
// 3. Read .sql files
// 4. Sort them
// 5. Check which ones already ran
// 6. Run only new ones
// 7. Record successful migrations
// 8. Roll back if one fails

import fs from "node:fs/promises";
import path from "node:path";

import { pool } from "./pool";
import { logger } from "../lib/logger";

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const migrationsDir = path.join(process.cwd(), "src", "db", "migrations");

  const files = await fs.readdir(migrationsDir);

  const migrationFiles = files.filter((file) => file.endsWith(".sql")).sort();

  const client = await pool.connect();

  try {
    for (const file of migrationFiles) {
      const result = await client.query(
        `
          SELECT 1
          FROM migrations
          WHERE name = $1
        `,
        [file],
      );

      if (result.rowCount) {
        logger.info({ migration: file }, "Skipping migration");
        continue;
      }

      const filePath = path.join(migrationsDir, file);
      const sql = await fs.readFile(filePath, "utf8");

      logger.info({ migration: file }, "Running migration");

      await client.query("BEGIN");

      try {
        await client.query(sql);

        await client.query(
          `
            INSERT INTO migrations (name)
            VALUES ($1)
          `,
          [file],
        );

        await client.query("COMMIT");

        console.log(`Completed ${file}`);
      } catch (error) {
        await client.query("ROLLBACK");

        console.error(`Failed ${file}`);

        throw error;
      }
    }
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
