import { Request, Response } from "express";
import corsService from "../../services/cors.service.js";
export default async function techsHandler(req: Request, res: Response) {
  corsService.handleCors(req, res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const techs = [
    { id: "react", name: "React" },
    { id: "node", name: "Node.js" },
    { id: "js", name: "JavaScript" },
    { id: "ts", name: "TypeScript" },
    { id: "css", name: "CSS" },
  ];

  return res.status(200).json(techs);
}
