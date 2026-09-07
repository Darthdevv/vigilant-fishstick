import { Request, Response, NextFunction } from "express";
import { logger } from "../../lib/logger";


export function notFoundHandler(_req: Request, res: Response, _next: NextFunction) {
  const statusCode = 404;
  const message = "Route Not Found";
  logger.error({ statusCode, message });
  res.status(statusCode).json({ statusCode, message });
}