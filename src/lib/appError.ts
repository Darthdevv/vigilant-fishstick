class AppError extends Error {
  statusCode: number;
  status: "fail" | "error";
  isOperational: boolean;
  errorData: unknown | null;

  constructor(message: string, statusCode: number, errorData?: unknown) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.errorData = errorData ?? null;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;