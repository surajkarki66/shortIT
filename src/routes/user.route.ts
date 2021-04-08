import { Router } from "express";

import userValidation from "../middlewares/validations/userValidation";
import UserController from "../controllers/user.controller";
import authValidation from "../middlewares/validations/authValidation";

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
    this.router.get(
      "/me",
      authValidation.checkAuth,
      authValidation.checkRole(["user"]),
      UserController.me
    );
  }
}
