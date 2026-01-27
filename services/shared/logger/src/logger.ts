import fs from "fs";
import path from "path";
import * as rfs from "rotating-file-stream";

export type LogLevel = "debug" | "info" | "warn" | "error";

export type LoggerOptions = {
  serviceName: string;
  logDir?: string;
  level?: LogLevel;
};

type LogPayload = Record<string, unknown>;

function levelRank(level: LogLevel): number {
  switch (level) {
    case "debug": return 10;
    case "info": return 20;
    case "warn": return 30;
    case "error": return 40;
    default: return 20;
  }
}

export function createLogger(options: LoggerOptions) {
  const serviceName = options.serviceName;
  const logDir = options.logDir ?? path.resolve(process.cwd(), "logs");
  const level = (options.level ?? "info") as LogLevel;

  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

  const stream = rfs.createStream("app.log", {
    size: "10M",
    maxFiles: 10,
    path: logDir
  });

  function write(lvl: LogLevel, message: string, payload: LogPayload = {}) {
    if (levelRank(lvl) < levelRank(level)) return;

    const record = {
      ts: new Date().toISOString(),
      level: lvl,
      service: serviceName,
      message,
      ...payload
    };

    const line = JSON.stringify(record);
    stream.write(line + "\n");
    console.log(line);
  }

  return {
    debug: (message: string, payload?: LogPayload) => write("debug", message, payload),
    info: (message: string, payload?: LogPayload) => write("info", message, payload),
    warn: (message: string, payload?: LogPayload) => write("warn", message, payload),
    error: (message: string, payload?: LogPayload) => write("error", message, payload)
  };
}
