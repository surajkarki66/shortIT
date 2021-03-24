"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hpp_1 = __importDefault(require("hpp"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./configs/config"));
const db_1 = __importDefault(require("./utils/db"));
const httpLogger_1 = __importDefault(require("./utils/httpLogger"));
let middlewares = [
    express_1.default.json(),
    express_1.default.urlencoded({ extended: true }),
    express_mongo_sanitize_1.default(),
    helmet_1.default(),
    hpp_1.default(),
    compression_1.default({
        level: 6,
        threshold: 100 * 100,
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false;
            }
            return compression_1.default.filter(req, res);
        },
    }),
    httpLogger_1.default,
];
if (config_1.default.env === 'development') {
    middlewares = [
        ...middlewares,
        morgan_1.default('dev'),
        cors_1.default({
            origin: config_1.default.url,
        }),
    ];
}
const app = new app_1.default({
    port: Number(config_1.default.server.port),
    host: config_1.default.server.hostname,
    middleWares: middlewares,
});
db_1.default();
app.listen();
//# sourceMappingURL=server.js.map