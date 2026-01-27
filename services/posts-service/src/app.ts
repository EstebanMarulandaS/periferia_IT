import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import { requestIdMiddleware, httpLoggerMiddleware, errorHandlerMiddleware, createLogger } from "@shared/logger";
import { buildRoutes } from "./routes/index.js";
import { buildSwaggerSpec } from "./swagger.js";

export function buildApp() {
  const app = express();

  const serviceName = process.env.SERVICE_NAME ?? "posts-service";
  const port = Number(process.env.PORT ?? 3002);
  const logLevel = (process.env.LOG_LEVEL ?? "info") as any;

  const logger = createLogger({ serviceName, level: logLevel });

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use(requestIdMiddleware);
  app.use(httpLoggerMiddleware(logger));

  const spec = buildSwaggerSpec(serviceName, port);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));

  // Routes
  app.use(buildRoutes());

  app.use(errorHandlerMiddleware(logger));

  return { app, logger };
}
