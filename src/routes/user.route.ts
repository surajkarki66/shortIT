import { Router } from "express";

import userValidation from "../middlewares/validations/userValidation";
import UserController from "../controllers/user.controller";
import { authenticate, permit } from "../middlewares/auth";
import { onlyOwnerCanDoThis } from "../middlewares/permissions/userPermissions";
import showDataValidationError from "../middlewares/showDataValidationError";

export default class UserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes(): void {
    this.router.post(
      "/register",
      userValidation("signup"),
      UserController.signup
    );
    this.router.post("/login", userValidation("login"), UserController.login);
    this.router.get("/me", authenticate, permit(["user"]), UserController.me);
    this.router.post(
      "/forgotPassword",
      userValidation("forgotPassword"),
      UserController.forgotPassword
    );
    this.router.post(
      "/resetPassword",
      userValidation("resetPassword"),
      UserController.resetPassword
    );
    this.router.post(
      "/verifyEmail",
      userValidation("verifyEmail"),
      showDataValidationError,
      authenticate,
      permit(["user"]),
      onlyOwnerCanDoThis,
      UserController.verifyEmail
    );
    this.router.post(
      "/activate",
      userValidation("activation"),
      UserController.activation
    );
    this.router.post(
      "/changeEmail/:userId",
      userValidation("changeEmail"),
      showDataValidationError,
      authenticate,
      permit(["user"]),
      onlyOwnerCanDoThis,
      UserController.changeEmail
    );
    this.router.post(
      "/changePassword/:userId",
      userValidation("changePassword"),
      showDataValidationError,
      authenticate,
      permit(["user"]),
      onlyOwnerCanDoThis,
      UserController.changePassword
    );
    this.router.post(
      "/changeUserDetails/:userId",
      userValidation("changeUserDetails"),
      showDataValidationError,
      authenticate,
      permit(["user"]),
      onlyOwnerCanDoThis,
      UserController.changeUserDetails
    );
  }
}
