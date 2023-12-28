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
exports.onlyActiveUserCanDoThis = exports.onlyOwnerCanDoThis = void 0;
const User_1 = __importDefault(require("../../models/User"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const onlyOwnerCanDoThis = (req, _res, next) => {
    const userId = req.user.id;
    if (req.params && req.params.userId === userId) {
        return next();
    }
    else if (req.body.userId && req.body.userId === userId) {
        return next();
    }
    else if (req.params && req.body.userId && req.body.userId === userId) {
        return next();
    }
    else {
        next(apiError_1.default.forbidden("Only owner can do this action"));
        return;
    }
};
exports.onlyOwnerCanDoThis = onlyOwnerCanDoThis;
const onlyActiveUserCanDoThis = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const user = yield User_1.default.findById(userId);
    if (user && user.status === "active") {
        return next();
    }
    next(apiError_1.default.forbidden("Only active user can this action"));
    return;
});
exports.onlyActiveUserCanDoThis = onlyActiveUserCanDoThis;
//# sourceMappingURL=userPermissions.js.map