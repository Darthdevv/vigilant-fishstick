import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.port) ?? 4000,
  nodeEnv: process.env.node_env ?? "development",
  isProduction: process.env.node_env === "production",
  logLevel: process.env.log_level ?? "info",
  databaseUrl: process.env.database_url ?? "postgresql://postgres:postgres@localhost:5432/node_postgres_db",
} as const;

