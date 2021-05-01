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
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../configs/config"));
function signToken(payload, expiresIn) {
    const secret = String(config_1.default.jwtSecret);
    const options = {
        expiresIn: expiresIn,
        issuer: "shortIt.com",
    };
    return jsonwebtoken_1.default.sign(payload, secret, options);
}
exports.signToken = signToken;
function verifyToken({ token, secretKey, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return jsonwebtoken_1.default.verify(token, secretKey, (error, response) => {
            if (error) {
                if (String(error).startsWith("TokenExpiredError")) {
                    return { error: "Expired link. Signup again." };
                }
                if (String(error).startsWith("JsonWebTokenError")) {
                    return { error: "Invalid token." };
                }
            }
            return response;
        });
    });
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwtHelper.js.map