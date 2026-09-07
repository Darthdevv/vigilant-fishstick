import express from "express";
import cors from "cors";
import { notFoundHandler } from "./middlewares/error/notFound.middleware";
import { errorHandler } from "./middlewares/error/error.middleware";
import { apiRouter } from "./routes";



export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use("/api", apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}