import { seedService } from "../api/seed/seed.service.js";

const seed = async () => {
  try {
    const { techs, questions } = await seedService.resetAndSeed();
    console.log(`✅ Successfully seeded ${techs.length} techs and ${questions.length} questions`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seed();
