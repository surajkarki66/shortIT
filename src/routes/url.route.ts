import { Router } from "express";

import urlValidation from "../middlewares/validations/urlValidation";
import authValidation from "../middlewares/validations/authValidation";
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
      authValidation.checkAuth,
      urlValidation("generateUrl"),
      UrlController.generateShortUrl
    );
    this.router.post(
      "/generateGuestUrl",
      urlValidation("generateUrl"),
      GuestUrlController.generateShortUrl
    );
    this.router.patch(
      "/updateUrl/:urlId",
      authValidation.checkAuth,
      urlValidation("updateUrl"),
      UrlController.updateUrl
    );
    this.router.delete(
      "/deleteUrl/:urlId",
      authValidation.checkAuth,
      urlValidation("deleteUrl"),
      UrlController.deleteUrl
    );
  }
}
