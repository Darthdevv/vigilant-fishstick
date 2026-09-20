import { Router } from "express";
import { getBannerStatus } from "./banner.controller";

const bannerRouter = Router();

bannerRouter.route("/").get(getBannerStatus);

export default bannerRouter;