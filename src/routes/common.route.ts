import { Router } from "express";
import CommonController from "../controllers/common.controller";

export default class IndexRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get("/:code", CommonController.goToUrl);
  }
}
