import { z } from "zod"

const envSchema = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  NEXT_PUBLIC_APP_URL: z.string(),
  NEXTAUTH_URL: z.string(),
  DATABASE_URL: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  EMAIL_SERVER: z.string(),
  EMAIL_FROM: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NODE_ENV: z.string(),
})

type EnvVariable = keyof z.infer<typeof envSchema>

export const getEnvVariable = (variable: EnvVariable) => {
  // eslint-disable-next-line no-process-env
  const env = envSchema.parse(process.env)

  return env[variable]
}