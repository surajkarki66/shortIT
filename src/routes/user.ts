import { Router } from "express";

import userValidation from "../middlewares/userValidation";
import UserController from "../controllers/user";
import checkAuth from "../middlewares/authValidation";

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
    this.router.get("/me", checkAuth, UserController.me);
  }
}
