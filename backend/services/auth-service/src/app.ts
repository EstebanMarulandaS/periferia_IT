import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import { createLogger, requestIdMiddleware, httpLoggerMiddleware, errorHandlerMiddleware } from "@shared/logger";
import { buildRoutes } from "./routes/index.js";
import { buildSwaggerSpec } from "./swagger.js";

export function createApp() {
  const app = express();

  const serviceName = process.env.SERVICE_NAME ?? "auth-service";
  const port = Number(process.env.PORT ?? 3001);
  const logLevel = (process.env.LOG_LEVEL ?? "info") as any;

  const logger = createLogger({ serviceName, level: logLevel });

  // Core middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // Observability
  app.use(requestIdMiddleware);
  app.use(httpLoggerMiddleware(logger));

  // Swagger
  const spec = buildSwaggerSpec(serviceName, port);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));

  // Routes
  app.use(buildRoutes());

  // Error handler last
  app.use(errorHandlerMiddleware(logger));

  return { app, logger, port, serviceName };
}
