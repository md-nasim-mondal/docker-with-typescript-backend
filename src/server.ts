import { Server } from "http";
import app from "./app";
import { errorLogger, logger } from "./app/src/shared/logger";

let server: Server;

async function main() {
  try {
    server = app.listen(process.env.PORT || 5000, () => {
      console.log(`app is listening on port ${process.env.PORT || 5000}`);
      logger.info(`app is listening on port ${process.env.PORT || 5000}`);
    });
  } catch (err) {
    console.log(err);
    errorLogger.error(err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`, err);
  errorLogger.error(err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  errorLogger.error("uncaughtException is detected");
  process.exit(1);
});
