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
const Url_1 = __importDefault(require("../models/Url"));
const Guest_1 = __importDefault(require("../models/Guest"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const goToUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.params;
        const url = Url_1.default.findByCode(code);
        const guestUrl = Guest_1.default.findByCode(code);
        const result = yield Promise.all([url, guestUrl]);
        if (result[0]) {
            const { _id, longUrl } = result[0];
            const updateObject = { accessedDates: new Date() };
            yield Url_1.default.updateAccessedDatesById(_id, updateObject);
            return res.redirect(longUrl);
        }
        if (result[1]) {
            const { longUrl } = result[1];
            return res.redirect(longUrl);
        }
        else {
            return res.status(404).json("No URL Found");
        }
    }
    catch (error) {
        next(apiError_1.default.internal(`Something went wrong: ${error.message}`));
        return;
    }
});
exports.default = { goToUrl };
//# sourceMappingURL=common.controller.js.map