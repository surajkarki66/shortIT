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
const nanoid_1 = require("nanoid");
const express_validator_1 = require("express-validator");
const Url_1 = __importDefault(require("../models/Url"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const config_1 = __importDefault(require("../configs/config"));
const validateUrl_1 = __importDefault(require("../helpers/validateUrl"));
const response_1 = __importDefault(require("../helpers/response"));
const errorFormatter_1 = __importDefault(require("../helpers/errorFormatter"));
const generateShortUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req).formatWith(errorFormatter_1.default);
        if (!errors.isEmpty()) {
            const msg = errors.array();
            next(apiError_1.default.badRequest(msg[0]));
            return;
        }
        const urlBody = req.body;
        const BASE_URL = String(config_1.default.baseUrl);
        const { longUrl } = urlBody;
        const { id } = req.user;
        yield validateUrl_1.default(BASE_URL);
        const address = yield validateUrl_1.default(longUrl);
        if (address) {
            const urlCode = nanoid_1.nanoid(6);
            let url = yield Url_1.default.findByLongUrlAndUserId(longUrl, id);
            let result;
            if (url) {
                result = { status: "success", data: url };
                const serverResponse = {
                    result: result,
                    statusCode: 201,
                    contentType: "application/json",
                };
                return response_1.default(res, serverResponse);
            }
            else {
                const shortUrl = `${BASE_URL}/${urlCode}`;
                url = new Url_1.default({
                    userId: id,
                    longUrl,
                    shortUrl,
                    code: urlCode,
                });
                yield url.save();
                result = { status: "success", data: url };
                const serverResponse = {
                    result: result,
                    statusCode: 201,
                    contentType: "application/json",
                };
                return response_1.default(res, serverResponse);
            }
        }
        next(apiError_1.default.notFound("IP address not found"));
        return;
    }
    catch (error) {
        const { code } = error;
        if (code === "ENOTFOUND" || "ERR_INVALID_URL") {
            next(apiError_1.default.badRequest("The given link is currently not working or invalid"));
            return;
        }
        next(apiError_1.default.internal(`Something went wrong: ${error.message}`));
        return;
    }
});
const updateUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req).formatWith(errorFormatter_1.default);
        if (!errors.isEmpty()) {
            const msg = errors.array();
            next(apiError_1.default.badRequest(msg[0]));
            return;
        }
        const { urlId } = req.params;
        const { title } = req.body;
        const updateObject = { title };
        const { success, data, statusCode } = yield Url_1.default.updateById(urlId, updateObject);
        if (success) {
            const result = {
                status: "success",
                data: data,
            };
            const serverResponse = {
                result: result,
                statusCode: statusCode,
                contentType: "application/json",
            };
            return response_1.default(res, serverResponse);
        }
        next(apiError_1.default.notFound(data.message));
        return;
    }
    catch (error) {
        next(apiError_1.default.internal(`Something went wrong: ${error.message}`));
        return;
    }
});
const deleteUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req).formatWith(errorFormatter_1.default);
        if (!errors.isEmpty()) {
            const msg = errors.array();
            next(apiError_1.default.badRequest(msg[0]));
            return;
        }
        const { urlId } = req.params;
        const { success, data, statusCode } = yield Url_1.default.deleteById(urlId);
        if (success) {
            const result = {
                status: "success",
                data: data,
            };
            const serverResponse = {
                result: result,
                statusCode: statusCode,
                contentType: "application/json",
            };
            return response_1.default(res, serverResponse);
        }
        next(apiError_1.default.notFound(data.message));
        return;
    }
    catch (error) {
        next(apiError_1.default.internal(`Something went wrong: ${error.message}`));
        return;
    }
});
exports.default = { generateShortUrl, updateUrl, deleteUrl };
//# sourceMappingURL=url.controller.js.map