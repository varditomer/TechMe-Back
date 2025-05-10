import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dbService from "../../services/db.service.js";
import type { Tech, Question } from "./seed.models.js";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readSeedData = async () => {
  const jsonPath = path.join(__dirname, "seed-data.json");
  const raw = await readFile(jsonPath, "utf-8");
  return JSON.parse(raw) as { techs: Tech[]; questions: Question[] };
};

const resetAndSeed = async () => {
  const { techs, questions } = await readSeedData();
  const techCol = await dbService.getCollection("techs");
  const qCol = await dbService.getCollection("questions");

  await techCol.deleteMany({});
  await qCol.deleteMany({});

  await techCol.insertMany(techs);
  await qCol.insertMany(questions);

  return { techs, questions };
};

export const seedService = {
  resetAndSeed,
}; 
