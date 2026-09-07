import { Request, Response, NextFunction } from "express";
import { logger } from "../../lib/logger";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  logger.error({ statusCode, message });
  res.status(statusCode).json({ statusCode, message });
}
