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
exports.userSchema = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const user_1 = require("../interfaces/user");
exports.userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        min: 2,
        max: 32,
        required: [true, "firstName is required"],
    },
    lastName: {
        type: String,
        trim: true,
        min: 2,
        max: 32,
        required: [true, "lastName is required"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    role: {
        type: String,
        default: "subscriber",
        enum: user_1.ROLE,
    },
    status: {
        type: String,
        default: "inactive",
        enum: user_1.STATUS,
    },
}, {
    timestamps: true,
});
exports.userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(this.password, salt);
        this.password = hash;
        next();
    });
});
exports.userSchema.method("comparePassword", function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
});
exports.userSchema.static("manualHashPassword", function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        return hash;
    });
});
exports.userSchema.static("findByEmail", function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ email });
    });
});
exports.userSchema.static("findMe", function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = new mongoose_1.Types.ObjectId(id);
        const pipeline = [
            {
                $match: {
                    _id: userId,
                },
            },
            {
                $lookup: {
                    from: "urls",
                    localField: "_id",
                    foreignField: "userId",
                    as: "urls",
                },
            },
            { $unset: "password" },
        ];
        return yield this.aggregate(pipeline);
    });
});
exports.userSchema.static("updateById", function (id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            this.updateOne({ _id: id }, { $set: data })
                .then((res) => {
                {
                    const { modifiedCount } = res;
                    let result;
                    if (modifiedCount === 1) {
                        result = {
                            success: true,
                            data: { message: "User is updated successfully" },
                            statusCode: 200,
                        };
                        resolve(result);
                    }
                    result = {
                        success: false,
                        data: { message: "User is not found" },
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
exports.userSchema.static("deleteById", function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            this.deleteOne({ _id: id })
                .then((res) => {
                const { deletedCount } = res;
                let result;
                if (deletedCount === 1) {
                    result = {
                        success: true,
                        data: { message: "User is deleted successfully" },
                        statusCode: 200,
                    };
                    resolve(result);
                }
                result = {
                    success: false,
                    data: { message: "User is not found" },
                    statusCode: 404,
                };
                resolve(result);
            })
                .catch((error) => reject(error));
        });
    });
});
const User = mongoose_1.model("User", exports.userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map