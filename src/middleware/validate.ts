import { RequestHandler } from "express";
import { z } from "zod";

// A middleware for validating request structure,
// It accepts a schema validates it if failed throw error, else move to next
export const validate =
  (schema: z.ZodType): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) return next(result.error);
    next();
  };
