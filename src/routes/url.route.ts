import { Router } from "express";

import { authenticate, permit } from "../middlewares/auth";
import { onlyOwnerCanDoThis } from "../middlewares/permissions/urlPermissions";
import urlValidation from "../middlewares/validations/urlValidation";
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
      authenticate,
      permit(["user"]),
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
      authenticate,
      permit(["user"]),
      onlyOwnerCanDoThis,
      urlValidation("updateUrl"),
      UrlController.updateUrl
    );
    this.router.delete(
      "/deleteUrl/:urlId",
      authenticate,
      permit(["user"]),
      onlyOwnerCanDoThis,
      urlValidation("deleteUrl"),
      UrlController.deleteUrl
    );
  }
}
