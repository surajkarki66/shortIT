import { Router } from "express";

import urlValidation from "../middlewares/urlValidation";
import checkAuth from "../middlewares/authValidation";
import UrlController from "../controllers/url.controller";
import GuestUrlController from "../controllers/guest.controller";

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
