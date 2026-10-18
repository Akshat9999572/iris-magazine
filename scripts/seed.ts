import { seedDatabase } from "../lib/db/seed";

async function main() {
  await seedDatabase();
  console.log("Database seeded (admin + articles if empty).");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
