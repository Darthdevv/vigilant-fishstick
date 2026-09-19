import { Request, Response, NextFunction } from "express";
import { logger } from "../../lib/logger";
import AppError from "../../lib/appError";


export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    logger.warn(
      {
        statusCode: err.statusCode,
        message: err.message,
        errorData: err.errorData,
      },
      "Operational error",
    );

    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(err.errorData !== null && { data: err.errorData }),
    });
  }

  logger.error({ err }, "Unhandled error");

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}
