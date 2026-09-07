import { Router } from "express";
import { getHealthStatus } from "./health.controller";

const healthRouter = Router();

healthRouter.route("/").get(getHealthStatus);

export default healthRouter;