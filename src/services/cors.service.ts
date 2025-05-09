import { Request, Response } from "express";

const getAllowedOrigins = (): string[] => {
  const originsString = process.env.ALLOWED_ORIGINS || "";
  return originsString.split(",").filter((origin) => origin.trim() !== "");
};

const handleCors = (req: Request, res: Response): void => {
  const allowedOrigins = getAllowedOrigins();
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
};

const corsService = {
  getAllowedOrigins,
  handleCors,
};

export default corsService;
