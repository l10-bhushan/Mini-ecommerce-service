import express from "express";
import pinoHttp from "pino-http";
import { logger } from "./logger";
import { AppError } from "./errors";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();
app.use(pinoHttp({ logger }));
app.use(express.json());

app.get("/health", (_req, res) =>
  res.status(200).json({
    status: "ok",
  }),
);

app.use((_req, _res, next) =>
  next(new AppError(400, "Not found", "NOT_FOUND")),
);

app.use(errorHandler);
