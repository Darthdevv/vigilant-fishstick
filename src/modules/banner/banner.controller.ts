import { Request, Response } from "express";

export const getBannerStatus = (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Banner check passed" });
};
