import { Router } from "express";

import { validateUrl } from "../middlewares/urlValidation";
import UrlController from "../controllers/url";

export default class IndexRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes(): void {
    this.router.get("/:code", validateUrl("checkCode"), UrlController.goToUrl);
  }
}
