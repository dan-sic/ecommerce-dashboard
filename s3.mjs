import { readFileSync } from "fs"
import S3rver from "s3rver"

console.log("S3 server running")

new S3rver({
  port: 9000,
  address: "0.0.0.0",
  directory: "./s3",
  configureBuckets: [
    {
      name: process.env.S3_BUCKET_NAME,
      configs: [readFileSync("./cors.xml")],
    },
  ],
}).run()
