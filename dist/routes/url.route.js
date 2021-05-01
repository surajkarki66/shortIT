"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const urlPermissions_1 = require("../middlewares/permissions/urlPermissions");
const urlValidation_1 = __importDefault(require("../middlewares/validations/urlValidation"));
const url_controller_1 = __importDefault(require("../controllers/url.controller"));
const guest_controller_1 = __importDefault(require("../controllers/guest.controller"));
class UrlRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post("/generateUrl", auth_1.authenticate, auth_1.permit(["user"]), urlValidation_1.default("generateUrl"), url_controller_1.default.generateShortUrl);
        this.router.post("/generateGuestUrl", urlValidation_1.default("generateUrl"), guest_controller_1.default.generateShortUrl);
        this.router.patch("/updateUrl/:urlId", auth_1.authenticate, auth_1.permit(["user"]), urlPermissions_1.onlyOwnerCanDoThis, urlValidation_1.default("updateUrl"), url_controller_1.default.updateUrl);
        this.router.delete("/deleteUrl/:urlId", auth_1.authenticate, auth_1.permit(["user"]), urlPermissions_1.onlyOwnerCanDoThis, urlValidation_1.default("deleteUrl"), url_controller_1.default.deleteUrl);
    }
}
exports.default = UrlRoutes;
//# sourceMappingURL=url.route.js.map