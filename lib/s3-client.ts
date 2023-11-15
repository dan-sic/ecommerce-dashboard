import { S3Client } from "@aws-sdk/client-s3"

import { getEnvVariable } from "./get-env-variable"

export const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: process.env.NEXT_PUBLIC_S3_HOST!,
  forcePathStyle: true,
  credentials: {
    accessKeyId: "S3RVER",
    secretAccessKey: "S3RVER",
  },
})
