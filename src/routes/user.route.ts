import { Router } from "express";

import userValidation from "../middlewares/validations/userValidation";
import UserController from "../controllers/user.controller";
import { authenticate, permit } from "../middlewares/auth";

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
  }
}
