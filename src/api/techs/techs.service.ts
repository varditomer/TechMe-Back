import dbService from "../../services/db.service.js";
import type { Tech } from "./techs.models.js";

const getAllTechs = async (): Promise<Tech[]> => {
  const collection = await dbService.getCollection<Tech>("techs");
  return (await collection.find().toArray()) as Tech[];
};

export const techsService = {
  getAllTechs,
}; 
