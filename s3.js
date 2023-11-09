const fs = require("fs")
const S3rver = require("s3rver")

console.log("S3 server running")

new S3rver({
  port: 9000,
  address: "0.0.0.0",
  directory: "./s3",
  configureBuckets: [
    {
      name: "test-bucket",
      configs: [fs.readFileSync("./cors.xml")],
    },
  ],
}).run()
