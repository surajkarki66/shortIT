import { Router } from "express";

import urlValidation from "../middlewares/urlValidation";
import checkAuth from "../middlewares/authValidation";
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
      urlValidation("generateUrl"),
      UrlController.generateShortUrl
    );
    this.router.post(
      "/generateGuestUrl",
      urlValidation("generateUrl"),
      GuestUrlController.generateShortUrl
    );
  }
}
