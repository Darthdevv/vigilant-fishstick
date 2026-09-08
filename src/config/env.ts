import dotenv from "dotenv";
import { checkRequiredEnvVariables } from "../lib/envChecker";

dotenv.config();

export const env = {
  port: Number(checkRequiredEnvVariables("port")),
  nodeEnv: checkRequiredEnvVariables("node_env") ?? "development",
  isProduction: checkRequiredEnvVariables("node_env") === "production",
  logLevel: checkRequiredEnvVariables("log_level") ?? "info",
  databaseUrl: checkRequiredEnvVariables("database_url"),
} as const;

