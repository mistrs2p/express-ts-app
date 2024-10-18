import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  // levels: winston.config.syslog.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export default logger;
