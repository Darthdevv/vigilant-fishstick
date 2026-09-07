import { createApp } from "./app";
import { logger } from "./lib/logger";
import { env } from "./config/env";

const app = createApp();

app.listen(env.port, () => {
  logger.info(`Server is running on port http://localhost:${env.port}`);
});