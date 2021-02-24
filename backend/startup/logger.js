const config = require("config");
const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.MongoDB(
    { db: config.get('DB_URL'), level:"error" }),
  ],
  exitOnError: false,
});
logger.info("Logger initialisation successful");
module.exports = logger;
