import { readFileSync } from "fs"
import S3rver from "s3rver"

console.log("S3 server running")

new S3rver({
  address: "0.0.0.0",
  directory: "./s3",
  configureBuckets: [
    {
      name: process.env.S3_BUCKET_NAME,
      configs: [readFileSync("./cors.xml")],
    },
  ],
}).run()
