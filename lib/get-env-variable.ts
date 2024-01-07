import { z } from "zod"

const envSchema = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  NEXTAUTH_URL: z.string(),
  DATABASE_URL: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  EMAIL_SERVER: z.string(),
  EMAIL_FROM: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NODE_ENV: z.string(),
  DEV_S3_HOST: z.string(),
  S3_BUCKET_NAME: z.string(),
  S3_CLIENT_KEY: z.string(),
  S3_CLIENT_SECRET: z.string(),
  S3_REGION: z.string(),
})

type EnvVariable = keyof z.infer<typeof envSchema>

export const getEnvVariable = (variable: EnvVariable) => {
  // eslint-disable-next-line no-process-env
  const env = envSchema.parse(process.env)

  return env[variable]
}
