import { Router } from "express";

import { validateUrl } from "../middlewares/urlValidation";
import { checkAuth } from "../middlewares/userValidation";
import UrlController from "../controllers/url";
import GuestUrlController from "../controllers/guest";

export default class UrlRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes(): void {
    this.router.post(
      "/generateUrl",
      checkAuth,
      validateUrl("generateUrl"),
      UrlController.generateShortUrl
    );
    this.router.post(
      "/generateGuestUrl",
      validateUrl("generateGuestUrl"),
      GuestUrlController.generateShortUrl
    );
  }
}
