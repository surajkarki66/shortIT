"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../configs/config"));
const logger_1 = __importDefault(require("./logger"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = mongoose_1.default.connection;
    connection.on("connected", () => {
        logger_1.default.info("Mongo Connection Established");
    });
    connection.on("reconnected", () => {
        logger_1.default.info("Mongo Connection Reestablished");
    });
    connection.on("disconnected", () => {
        logger_1.default.info("Mongo Connection Disconnected");
        logger_1.default.info("Trying to reconnect to Mongo ...");
        setTimeout(() => {
            mongoose_1.default.connect(config_1.default.mongo.url, config_1.default.mongo.options);
        }, 3000);
    });
    connection.on("close", () => {
        logger_1.default.info("Mongo Connection Closed");
    });
    connection.on("error", (error) => {
        logger_1.default.info("Mongo Connection ERROR: " + error);
    });
    const run = () => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect(config_1.default.mongo.url, config_1.default.mongo.options);
    });
    run().catch((error) => logger_1.default.error(error));
});
exports.default = connectDB;
//# sourceMappingURL=db.js.map