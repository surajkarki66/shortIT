"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const common_controller_1 = __importDefault(require("../controllers/common.controller"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get("/:code", common_controller_1.default.goToUrl);
    }
}
exports.default = IndexRoutes;
//# sourceMappingURL=common.route.js.map