"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userValidation_1 = __importDefault(require("../middlewares/validations/userValidation"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = require("../middlewares/auth");
const userPermissions_1 = require("../middlewares/permissions/userPermissions");
const showDataValidationError_1 = __importDefault(require("../middlewares/showDataValidationError"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post("/register", userValidation_1.default("signup"), user_controller_1.default.signup);
        this.router.post("/login", userValidation_1.default("login"), user_controller_1.default.login);
        this.router.post("/forgotPassword", userValidation_1.default("forgotPassword"), user_controller_1.default.forgotPassword);
        this.router.post("/resetPassword", userValidation_1.default("resetPassword"), user_controller_1.default.resetPassword);
        this.router.post("/verifyEmail", auth_1.authenticate, auth_1.permit(["subscriber"]), userPermissions_1.onlyOwnerCanDoThis, userValidation_1.default("verifyEmail"), showDataValidationError_1.default, user_controller_1.default.verifyEmail);
        this.router.post("/activate", userValidation_1.default("activation"), user_controller_1.default.activation);
        this.router.post("/changeEmail/:userId", auth_1.authenticate, auth_1.permit(["subscriber"]), userPermissions_1.onlyOwnerCanDoThis, userValidation_1.default("changeEmail"), showDataValidationError_1.default, user_controller_1.default.changeEmail);
        this.router.post("/changePassword/:userId", auth_1.authenticate, auth_1.permit(["subscriber"]), userPermissions_1.onlyOwnerCanDoThis, userValidation_1.default("changePassword"), showDataValidationError_1.default, user_controller_1.default.changePassword);
        this.router.post("/changeUserDetails/:userId", auth_1.authenticate, auth_1.permit(["subscriber"]), userPermissions_1.onlyOwnerCanDoThis, userPermissions_1.onlyActiveUserCanDoThis, userValidation_1.default("changeUserDetails"), showDataValidationError_1.default, user_controller_1.default.changeUserDetails);
        this.router.post("/deleteUser/:userId", auth_1.authenticate, auth_1.permit(["subscriber"]), userPermissions_1.onlyOwnerCanDoThis, userValidation_1.default("deleteUser"), showDataValidationError_1.default, user_controller_1.default.deleteUser);
        this.router.get("/logout", user_controller_1.default.logOut);
        this.router.get("/loggedIn", user_controller_1.default.loggedIn);
        this.router.get("/me", auth_1.authenticate, auth_1.permit(["subscriber"]), user_controller_1.default.me);
        this.router.get("/csrf-token", (req, res) => {
            return res.json({ csrfToken: req.csrfToken() });
        });
    }
}
exports.default = UserRoutes;
//# sourceMappingURL=user.route.js.map