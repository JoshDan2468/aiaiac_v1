import { Pool } from "pg";
import { env } from "./env";

let pool: Pool | null = null;

export function getDatabasePool(): Pool | null {
  if (!env.databaseUrl) return null;

  if (!pool) {
    pool = new Pool({
      connectionString: env.databaseUrl,
      max: 10,
      connectionTimeoutMillis: 5_000,
      idleTimeoutMillis: 30_000,
      // Production SSL settings depend on the selected PostgreSQL host and must be configured
      // according to that provider's certificate requirements.
    });

    pool.on("error", (error) => {
      console.error("Unexpected PostgreSQL pool error", {
        errorType: error.name,
      });
    });
  }

  return pool;
}

export async function checkDatabaseConnection(): Promise<void> {
  const databasePool = getDatabasePool();

  if (!databasePool) {
    console.error(
      "Database readiness check failed: DATABASE_URL is not configured",
    );
    throw new Error("Database is not configured");
  }

  try {
    await databasePool.query("SELECT 1;");
  } catch (error) {
    console.error("Database readiness check failed", {
      errorType: error instanceof Error ? error.name : "UnknownDatabaseError",
    });
    throw new Error("Database connection check failed", { cause: error });
  }
}

export async function closeDatabasePool(): Promise<void> {
  if (!pool) return;
  await pool.end();
  pool = null;
}
