import { seedDatabase } from "../lib/db/seed";

async function main() {
  await seedDatabase();
  console.log("Store seeded (admin + articles if empty).");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
