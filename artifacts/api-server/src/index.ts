import path from "path";
import app from "./app";
import { logger } from "./lib/logger";
import { runMigrations } from "@workspace/db/migrate";
import { seedIfEmpty } from "@workspace/db/seed";

const port = Number(process.env["PORT"] || 10000);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${process.env["PORT"]}"`);
}

async function start() {
  // import.meta.dirname = .../artifacts/api-server/dist/ at runtime (bundled)
  // migrations live at .../lib/db/drizzle/ — three levels up then into lib/db/drizzle
  const migrationsFolder = path.resolve(
    import.meta.dirname ?? __dirname,
    "../../../lib/db/drizzle",
  );

  try {
    logger.info({ migrationsFolder }, "Running database migrations…");
    await runMigrations(migrationsFolder);
    logger.info("Migrations complete. Seeding if needed…");
    await seedIfEmpty();
    logger.info("Seed check complete.");
  } catch (err) {
    logger.error({ err }, "Startup migration/seed failed");
    process.exit(1);
  }

  app.listen(port, "0.0.0.0", (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }
    logger.info({ port }, "Server listening");
  });
}

start();
