import { Request, Response } from "express";
import { examService } from "./exam.service.js";

const startExam = async (req: Request, res: Response) => {
  const { techs, numPerTech } = req.body;

  if (!techs || !Array.isArray(techs) || !numPerTech) {
    return res.status(400).json({ error: "Missing techs or numPerTech" });
  }

  try {
    const questions = await examService.getRandomQuestions(techs, numPerTech);
    return res.status(200).json(questions);
  } catch (err) {
    console.error("Failed to generate exam:", err);
    return res.status(500).json({ error: "Failed to generate exam" });
  }
};

export const examController = {
  startExam,
};
