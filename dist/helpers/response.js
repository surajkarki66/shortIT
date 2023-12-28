"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function writeServerResponse(res, responseData) {
    const { result, statusCode, contentType } = responseData;
    res.setHeader("Content-Type", contentType);
    return res.status(statusCode).json(result);
}
exports.default = writeServerResponse;
//# sourceMappingURL=response.js.map