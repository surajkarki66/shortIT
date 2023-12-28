"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const dns_1 = __importDefault(require("dns"));
function validateUrl(longUrl) {
    const { hostname } = new url_1.default.URL(longUrl);
    return new Promise((resolve, reject) => {
        dns_1.default.lookup(hostname, (err, address) => {
            if (err)
                reject(err);
            resolve(address);
        });
    });
}
exports.default = validateUrl;
//# sourceMappingURL=validateUrl.js.map