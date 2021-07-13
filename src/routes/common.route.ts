import { Router } from "express";

import urlValidation from "../middlewares/validations/urlValidation";
import CommonController from "../controllers/common.controller";

export default class IndexRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get("/csrf-token", (req, res) => {
      return res.json({ csrfToken: req.csrfToken() });
    });
    this.router.get("/:code", CommonController.goToUrl);
  }
}
