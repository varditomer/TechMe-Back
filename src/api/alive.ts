// api/alive.ts
import { Request, Response } from "express";
import corsService from "../services/cors.service.js";

export default async function handler(req: Request, res: Response) {
  // Handle CORS
  corsService.handleCors(req, res);

  // Handle OPTIONS for CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Return health check response
  return res.status(200).json({
    status: "OK",
    message: "Server is Alive!",
  });
}
