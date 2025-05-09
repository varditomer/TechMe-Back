import { Request, Response } from "express";
import corsService from "../../services/cors.service.js";
import { examController } from "./exam.controller.js";

export default async function handler(req: Request, res: Response) {
  corsService.handleCors(req, res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  return examController.startExam(req, res);
}
