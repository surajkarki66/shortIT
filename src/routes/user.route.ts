import { Router } from "express";

import userValidation from "../middlewares/validations/userValidation";
import UserController from "../controllers/user.controller";
import { authenticate, permit } from "../middlewares/auth";
import {
  onlyOwnerCanDoThis,
  onlyActiveUserCanDoThis,
} from "../middlewares/permissions/userPermissions";
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
      permit(["subscriber"]),
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
      permit(["subscriber"]),
      onlyOwnerCanDoThis,
      userValidation("changeEmail"),
      showDataValidationError,
      UserController.changeEmail
    );
    this.router.post(
      "/changePassword/:userId",
      authenticate,
      permit(["subscriber"]),
      onlyOwnerCanDoThis,
      userValidation("changePassword"),
      showDataValidationError,
      UserController.changePassword
    );
    this.router.post(
      "/changeUserDetails/:userId",
      authenticate,
      permit(["subscriber"]),
      onlyOwnerCanDoThis,
      onlyActiveUserCanDoThis,
      userValidation("changeUserDetails"),
      showDataValidationError,
      UserController.changeUserDetails
    );
    this.router.post(
      "/deleteUser/:userId",
      authenticate,
      permit(["subscriber"]),
      onlyOwnerCanDoThis,
      userValidation("deleteUser"),
      showDataValidationError,
      UserController.deleteUser
    );
    this.router.get("/logout", UserController.logOut);
    this.router.get("/loggedIn", UserController.loggedIn);
    this.router.get(
      "/me",
      authenticate,
      permit(["subscriber"]),
      UserController.me
    );
    this.router.get("/csrf-token", (req, res) => {
      return res.json({ csrfToken: req.csrfToken() });
    });
  }
}
