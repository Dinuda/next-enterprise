import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z.boolean().default(false),
    POSTGRES_PRISMA_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_POSTGRES_URL_HERE"),
        "You forgot to change the default URL"
      ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    POSTGRES_URL_NON_POOLING: z.string().url().refine(
      (str) => !str.includes("YOUR_POSTGRES_URL_HERE"),
      "You forgot to change the default URL"
    ),
    AWS_VERIFIED_EMAIL: z.string().email(),
    AWS_REGION: z.string(),
    EMAIL_SERVER: z.string(),
  },
  client: {},
  runtimeEnv: {
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    AWS_VERIFIED_EMAIL: process.env.AWS_VERIFIED_EMAIL,
    AWS_REGION: process.env.AWS_REGION,
    EMAIL_SERVER: process.env.EMAIL_SERVER,
  },
})
