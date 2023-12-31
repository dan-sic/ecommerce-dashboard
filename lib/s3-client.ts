import { S3Client } from "@aws-sdk/client-s3"

import { getEnvVariable } from "./get-env-variable"

export const s3Client = new S3Client({
  region: getEnvVariable("S3_REGION"),
  endpoint:
    process.env.NODE_ENV === "development"
      ? getEnvVariable("DEV_S3_HOST")
      : undefined,
  forcePathStyle: true,
  credentials: {
    accessKeyId: getEnvVariable("S3_CLIENT_KEY"),
    secretAccessKey: getEnvVariable("S3_CLIENT_SECRET"),
  },
})
