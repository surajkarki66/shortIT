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
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const hpp_1 = __importDefault(require("hpp"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const csurf_1 = __importDefault(require("csurf"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const db_1 = __importDefault(require("./utils/db"));
const httpLogger_1 = __importDefault(require("./utils/httpLogger"));
const config_1 = __importDefault(require("./configs/config"));
const apiErrorHandler_1 = __importDefault(require("./errors/apiErrorHandler"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const url_route_1 = __importDefault(require("./routes/url.route"));
const common_route_1 = __importDefault(require("./routes/common.route"));
const logger_1 = __importDefault(require("./utils/logger"));
class Server {
    constructor() {
        this.csrfProtection = csurf_1.default({
            cookie: {
                secure: config_1.default.env === "production" ? true : false,
                httpOnly: config_1.default.env === "production" ? true : false,
                sameSite: config_1.default.env === "production" ? true : false,
            },
        });
        this.app = express_1.default();
        this.middlewares();
        this.routes();
        this.database();
    }
    routes() {
        // General routes
        this.app.use("/api/users", new user_route_1.default().router);
        this.app.use("/api/url", new url_route_1.default().router);
        // Common routes
        this.app.use("/u", new common_route_1.default().router);
        // Frontend production
        if (config_1.default.env === "development") {
            this.app.use(express_1.default.static(path_1.default.resolve(__dirname, "../client", "build")));
            this.app.get("*", (req, res) => {
                res.sendFile(path_1.default.resolve(__dirname, "../client", "build", "index.html"));
            });
        }
        // Error handler route
        this.app.use(apiErrorHandler_1.default);
    }
    middlewares() {
        this.app.enable("trust proxy");
        this.app.use(cors_1.default({
            origin: config_1.default.url,
            credentials: true,
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cookie_parser_1.default());
        this.app.use(express_mongo_sanitize_1.default());
        this.app.use(helmet_1.default());
        this.app.use(hpp_1.default());
        this.app.use(this.csrfProtection);
        this.app.use(httpLogger_1.default);
        this.app.use(compression_1.default({
            level: 6,
            threshold: 100 * 100,
            filter: (req, res) => {
                if (req.headers["x-no-compression"]) {
                    return false;
                }
                return compression_1.default.filter(req, res);
            },
        }));
        if (config_1.default.env === "development") {
            this.app.use(morgan_1.default("dev"));
        }
    }
    database() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default();
        });
    }
    start() {
        this.app.listen(config_1.default.server.port, () => {
            logger_1.default.info(`API is running at http://${config_1.default.server.hostname}:${config_1.default.server.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map