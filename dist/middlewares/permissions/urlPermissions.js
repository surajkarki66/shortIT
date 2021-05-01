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
exports.onlyOwnerCanDoThis = void 0;
const apiError_1 = __importDefault(require("../../errors/apiError"));
const Url_1 = __importDefault(require("../../models/Url"));
const onlyOwnerCanDoThis = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const { urlId } = req.params;
        const data = yield Url_1.default.findById(urlId);
        if (data && data.userId.toString() === id) {
            return next();
        }
        next(apiError_1.default.forbidden("Only owner can do this action"));
        return;
    }
    catch (error) {
        next(apiError_1.default.internal(`Something went wrong: ${error}`));
        return;
    }
});
exports.onlyOwnerCanDoThis = onlyOwnerCanDoThis;
//# sourceMappingURL=urlPermissions.js.map