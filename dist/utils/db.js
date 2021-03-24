"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../configs/config"));
const logger_1 = __importDefault(require("./logger"));
const connectDB = async () => {
    try {
        const result = await mongoose_1.default.connect(config_1.default.mongo.url, config_1.default.mongo.options);
        if (result) {
            logger_1.default.info(`MongoDB Connected: ${result.connection.host}`);
        }
    }
    catch (error) {
        logger_1.default.error('Server', error.message, error);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map