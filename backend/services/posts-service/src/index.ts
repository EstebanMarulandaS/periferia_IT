import dotenv from "dotenv";
import { buildApp } from "./app.js";

dotenv.config();

const port = Number(process.env.PORT ?? 3002);

const { app, logger } = buildApp();

app.listen(port, () => {
  logger.info("service_started", { port, serviceName: process.env.SERVICE_NAME ?? "posts-service" });
});
