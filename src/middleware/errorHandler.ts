import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof ZodError) {
    res
      .status(400)
      .json({ error: { code: "VALIDATION", details: err.issues } });
    return;
  }
  if (err instanceof AppError) {
    res
      .status(err.status)
      .json({ error: { code: err.code, message: err.message } });
    return;
  }
  //req.log.error(err);
  console.log(err);
  res
    .status(500)
    .json({ error: { code: "INTERNAL", message: "Something went wrong" } });
};
