import { Request, Response } from "express";
import { techsService } from "./techs.service.js";

const getTechs = async (req: Request, res: Response) => {
  try {
    const techs = await techsService.getAllTechs();
    return res.status(200).json(techs);
  } catch (err) {
    console.error("Failed to get techs:", err);
    return res.status(500).json({ error: "Failed to get techs" });
  }
};

export const techsController = {
  getTechs,
}; 
