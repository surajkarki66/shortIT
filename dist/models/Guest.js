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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const guestUrlSchema = new mongoose_1.Schema({
    longUrl: {
        type: String,
        trim: true,
        required: [true, "longUrl is required"],
    },
    shortUrl: {
        type: String,
        trim: true,
        required: [true, "shortUrl is required"],
    },
    code: { type: String, trim: true, required: [true, "code is required"] },
}, { timestamps: true });
guestUrlSchema.static("findByLongUrl", function (longUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ longUrl });
    });
});
guestUrlSchema.static("findByCode", function (code) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ code });
    });
});
const GuestUrlModel = mongoose_1.model("GuestUrl", guestUrlSchema);
exports.default = GuestUrlModel;
//# sourceMappingURL=Guest.js.map