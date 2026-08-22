import { createServer } from "node:http";
import { createConfiguredApplication } from "./app";
import { closeDatabasePool } from "./config/database";
import { env } from "./config/env";

const server = createServer(createConfiguredApplication());
let shuttingDown = false;

server.listen(env.port, () => {
  console.info(`AIAIAC API listening on http://localhost:${env.port}`);
});

async function shutdown(signal: string): Promise<void> {
  if (shuttingDown) return;
  shuttingDown = true;
  console.info(`Received ${signal}; shutting down AIAIAC API`);

  const forceExitTimer = setTimeout(() => {
    console.error("Graceful shutdown timed out");
    process.exit(1);
  }, 10_000);
  forceExitTimer.unref();

  server.close(async (serverError) => {
    try {
      await closeDatabasePool();
    } catch {
      console.error("Database pool did not close cleanly");
      process.exitCode = 1;
    }

    if (serverError) {
      console.error("HTTP server did not close cleanly");
      process.exitCode = 1;
    }

    clearTimeout(forceExitTimer);
    process.exit();
  });
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

process.on("uncaughtException", (error) => {
  console.error("Fatal uncaught exception", { errorType: error.name });
  void shutdown("uncaughtException");
});

process.on("unhandledRejection", (reason) => {
  console.error("Fatal unhandled rejection", {
    errorType: reason instanceof Error ? reason.name : "UnknownRejection",
  });
  void shutdown("unhandledRejection");
});
