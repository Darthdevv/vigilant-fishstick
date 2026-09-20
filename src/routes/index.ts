import { Router } from "express";
import healthRouter from "../modules/banner/banner.routes";

export const apiRouter = Router();
apiRouter.use("/health", healthRouter);