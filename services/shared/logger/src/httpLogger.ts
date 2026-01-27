import type { NextFunction, Request, Response } from "express";

type SimpleLogger = {
  info: (message: string, payload?: Record<string, unknown>) => void;
  error: (message: string, payload?: Record<string, unknown>) => void;
};

type Mode = "all" | "api" | "errors";

function shouldIgnorePath(path: string) {
  if (path === "/docs" || path.startsWith("/docs/")) return true;

  if (/\.(css|js|png|jpg|jpeg|gif|svg|ico|map|woff|woff2|ttf)$/.test(path)) return true;

  return false;
}

export function httpLoggerMiddleware(logger: SimpleLogger) {
  const mode = ((process.env.HTTP_LOG_MODE ?? "api") as Mode);

  return function (req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime.bigint();

    res.on("finish", () => {
      const end = process.hrtime.bigint();
      const durationMs = Number(end - start) / 1_000_000;

      const path = req.originalUrl || req.url || "";
      const statusCode = res.statusCode;

      const isError = statusCode >= 400;
      const ignored = shouldIgnorePath(path);

      if (mode === "errors") {
        if (!isError) return;
      } else if (mode === "api") {
        if (!isError && ignored) return;
      }

      const payload = {
        requestId: (req as any).requestId,
        method: req.method,
        path,
        statusCode,
        durationMs: Math.round(durationMs * 100) / 100
      };

      if (isError) logger.error("http_request", payload);
      else logger.info("http_request", payload);
    });

    next();
  };
}

export function errorHandlerMiddleware(logger: SimpleLogger) {
  return function (err: any, req: Request, res: Response, _next: NextFunction) {
    logger.error("unhandled_error", {
      requestId: (req as any).requestId,
      method: req.method,
      path: req.originalUrl,
      error: {
        name: err?.name,
        message: err?.message,
        stack: err?.stack
      }
    });

    res.status(500).json({
      error: "Internal Server Error",
      requestId: (req as any).requestId
    });
  };
}
