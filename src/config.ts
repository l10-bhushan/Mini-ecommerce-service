import "dotenv/config";
import { z } from "zod";

// We create a zod schema, that parses and fills in the details from env variables
const schema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default("1h"),
  ADMIN_EMAIL: z.string().default("admin@shop.local"),
  ADMIN_PASSWORD: z.string().default("admin12345"),
});

export const config = schema.parse(process.env);
