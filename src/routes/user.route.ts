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
    this.router.get("/logout", UserController.logOut);
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
      authenticate,
      permit(["user"]),
      onlyOwnerCanDoThis,
      userValidation("verifyEmail"),
      showDataValidationError,
      UserController.verifyEmail
    );
    this.router.post(
      "/activate",
      userValidation("activation"),
      UserController.activation
    );
    this.router.post(
      "/changeEmail/:userId",
      authenticate,
      permit(["user"]),
      onlyOwnerCanDoThis,
      userValidation("changeEmail"),
      showDataValidationError,
      UserController.changeEmail
    );
    this.router.post(
      "/changePassword/:userId",
      authenticate,
      permit(["user"]),
      onlyOwnerCanDoThis,
      userValidation("changePassword"),
      showDataValidationError,
      UserController.changePassword
    );
    this.router.post(
      "/changeUserDetails/:userId",
      authenticate,
      permit(["user"]),
      onlyOwnerCanDoThis,
      userValidation("changeUserDetails"),
      showDataValidationError,
      UserController.changeUserDetails
    );
    this.router.delete(
      "/deleteUser/:userId",
      authenticate,
      permit(["user"]),
      onlyOwnerCanDoThis,
      userValidation("deleteUser"),
      showDataValidationError,
      UserController.deleteUser
    );
  }
}
