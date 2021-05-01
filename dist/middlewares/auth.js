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
exports.permit = exports.authenticate = void 0;
const apiError_1 = __importDefault(require("../errors/apiError"));
const config_1 = __importDefault(require("../configs/config"));
const jwtHelper_1 = require("../helpers/jwtHelper");
const authenticate = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers["authorization"]) {
        const authorization = req.headers["authorization"].split(" ");
        if (authorization[0] !== "Bearer") {
            next(apiError_1.default.unauthorized("Authentication failed."));
            return;
        }
        else {
            try {
                const response = yield jwtHelper_1.verifyToken({
                    token: authorization[1],
                    secretKey: String(config_1.default.jwtSecret),
                });
                const { _id, error, role } = response;
                if (_id) {
                    req.user = { id: _id, role };
                    return next();
                }
                next(apiError_1.default.forbidden(error));
                return;
            }
            catch (error) {
                next(apiError_1.default.forbidden(`Token is not verified: ${error}`));
                return;
            }
        }
    }
    else {
        next(apiError_1.default.unauthorized("Authentication failed"));
        return;
    }
});
exports.authenticate = authenticate;
const permit = (roles) => {
    return (req, res, next) => {
        const { role } = req.user;
        if (roles.includes(role)) {
            next();
        }
        else {
            next(apiError_1.default.unauthorized(`${role} is not allowed`));
            return;
        }
    };
};
exports.permit = permit;
//# sourceMappingURL=auth.js.map