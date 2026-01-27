import dotenv from "dotenv";
import { createApp } from "./app.js";

dotenv.config();

const { app, logger, port, serviceName } = createApp();

app.listen(port, () => {
  logger.info("service_started", { port, serviceName });
});
