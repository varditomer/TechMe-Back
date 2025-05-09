import dbService from "../services/db.service.js";

const techs = [
  { id: "react", name: "React" },
  { id: "node", name: "Node.js" },
  { id: "js", name: "JavaScript" },
  { id: "ts", name: "TypeScript" },
  { id: "css", name: "CSS" },
];

const questions = [
  {
    tech: "react",
    question: "What does useEffect do?",
    options: ["Side effects", "Styling", "Memory cleanup", "None"],
    correctOptionIndex: 0,
  },
  {
    tech: "react",
    question: "What is JSX?",
    options: ["JavaScript XML", "Just Syntax", "Json Style X", "None of these"],
    correctOptionIndex: 0,
  },
  {
    tech: "js",
    question: "Which of these is a primitive type?",
    options: ["Array", "Object", "String", "Function"],
    correctOptionIndex: 2,
  },
];

const seed = async () => {
  try {
    const techCol = await dbService.getCollection("techs");
    const qCol = await dbService.getCollection("questions");

    await techCol.deleteMany({});
    await qCol.deleteMany({});

    await techCol.insertMany(techs);
    await qCol.insertMany(questions);

    console.log("✅ Seeded techs and questions");
    await dbService.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seed();
