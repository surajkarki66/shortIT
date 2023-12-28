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
const urlSchema = new mongoose_1.Schema({
    title: { type: String, min: 1, max: 255, trim: true },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "userId is required"],
    },
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
    code: {
        type: String,
        trim: true,
        required: [true, "code is required"],
        min: 6,
        max: 6,
    },
    accessedDates: {
        type: [Date],
        default: [],
    },
}, { timestamps: true });
urlSchema.static("findByLongUrlAndUserId", function (longUrl, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = new mongoose_1.Types.ObjectId(id);
        return yield this.findOne({ longUrl, userId });
    });
});
urlSchema.static("findByCode", function (code) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ code });
    });
});
urlSchema.static("updateAccessedDatesById", function (id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.updateOne({ _id: id }, { $push: data });
    });
});
urlSchema.static("deleteById", function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const urlId = new mongoose_1.Types.ObjectId(id);
            this.deleteOne({ _id: urlId })
                .then((res) => {
                const { deletedCount } = res;
                let result;
                if (deletedCount === 1) {
                    result = {
                        success: true,
                        data: { message: "Url is deleted successfully" },
                        statusCode: 200,
                    };
                    resolve(result);
                }
                result = {
                    success: false,
                    data: { message: "Url is not found" },
                    statusCode: 404,
                };
                resolve(result);
            })
                .catch((error) => reject(error));
        });
    });
});
urlSchema.static("updateById", function (id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const urlId = new mongoose_1.Types.ObjectId(id);
            this.updateOne({ _id: urlId }, { $set: data })
                .then((res) => {
                {
                    const { nModified } = res;
                    let result;
                    if (nModified === 1) {
                        result = {
                            success: true,
                            data: { message: "Url is updated successfully" },
                            statusCode: 200,
                        };
                        resolve(result);
                    }
                    result = {
                        success: false,
                        data: { message: "Url is not found" },
                        statusCode: 404,
                    };
                    resolve(result);
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    });
});
urlSchema.static("deleteByUserId", function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.deleteMany({ userId: new mongoose_1.Types.ObjectId(userId) });
    });
});
const UrlModel = mongoose_1.model("Url", urlSchema);
exports.default = UrlModel;
//# sourceMappingURL=Url.js.map