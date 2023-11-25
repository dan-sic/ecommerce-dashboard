/* eslint-disable no-process-env */
require("dotenv").config()

module.exports = {
  apps: [
    {
      script: "npm start",
    },
    {
      script: "node s3.js",
    },
  ],

  deploy: {
    production: {
      key: "key.pem",
      user: process.env.VPS_USER,
      host: process.env.VPS_HOST,
      port: process.env.VPS_PORT,
      ref: "origin/main",
      repo: "git@github.com:dan-sic/ecommerce-dashboard.git",
      path: process.env.VPS_PATH,
      "pre-deploy-local": "",
      "post-deploy":
        "source ~/.nvm/nvm.sh && npm install && npx prisma migrate deploy && npx prisma generate && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
}
