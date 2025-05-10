import { Request, Response } from "express";
import { seedService } from "./seed.service.js";

const runSeed = async (req: Request, res: Response) => {
  try {
    const { techs, questions } = await seedService.resetAndSeed();
    return res.status(200).json({
      success: true,
      message: `Successfully seeded ${techs.length} techs and ${questions.length} questions`
    });
  } catch (err) {
    console.error("Seeding failed:", err);
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Unknown error occurred"
    });
  }
};

export const seedController = {
  runSeed,
};
