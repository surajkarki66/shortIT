import { Router } from "express";

import { validateUser, checkAuth } from "../middlewares/userValidation";
import UserController from "../controllers/user";

export default class UserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes(): void {
    this.router.post(
      "/register",
      validateUser("signup"),
      UserController.signup
    );
    this.router.post("/login", validateUser("login"), UserController.login);
    this.router.get("/me", checkAuth, UserController.me);
  }
}
