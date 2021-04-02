import winston from "winston";

const options = {
  file: {
    level: "info",
    filename: "./logs/app.log",
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.printf(
      (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`
    )
  ),
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

export default logger;
