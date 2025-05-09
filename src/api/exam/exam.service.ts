import dbService from "../../services/db.service.js";
import type { Question } from "./exam.models.js";

const getRandomQuestions = async (
  techs: string[],
  numPerTech: number
): Promise<Question[]> => {
  const collection = await dbService.getCollection<Question>("questions");
  const questions: Question[] = [];

  // Get random questions for each tech
  for (const tech of techs) {
    const techQuestions = (await collection
      .find({ tech })
      .limit(numPerTech)
      .toArray()) as Question[];

    questions.push(...techQuestions);
  }

  return questions;
};

export const examService = {
  getRandomQuestions,
};
