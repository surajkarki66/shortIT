import { Router } from "express";

import urlValidation from "../middlewares/urlValidation";
import CommonController from "../controllers/common.controller";

export default class IndexRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes(): void {
    this.router.get(
      "/:code",
      urlValidation("checkCode"),
      CommonController.goToUrl
    );
  }
}
