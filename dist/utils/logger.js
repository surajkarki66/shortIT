"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const options = {
    file: {
        level: "info",
        filename: "./logs/app.log",
        handleExceptions: true,
        json: false,
        maxsize: 5242880,
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
const logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston_1.default.format.printf((info) => `[${info.timestamp}] [${info.level}]: ${info.message}`)),
    levels: winston_1.default.config.npm.levels,
    transports: [
        new winston_1.default.transports.File(options.file),
        new winston_1.default.transports.Console(options.console),
    ],
    exitOnError: false,
});
exports.default = logger;
//# sourceMappingURL=logger.js.map