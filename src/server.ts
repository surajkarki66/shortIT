import path from "path";
import cookieParser from "cookie-parser";
import express from "express";
import hpp from "hpp";
import morgan from "morgan";
import cors from "cors";
import csrf from "csurf";
import helmet from "helmet";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";

import connectDB from "./utils/db";
import httpLogger from "./utils/httpLogger";
import config from "./configs/config";
import apiErrorHandler from "./errors/apiErrorHandler";
import UserRoutes from "./routes/user.route";
import UrlRoutes from "./routes/url.route";
import CommonRoutes from "./routes/common.route";
import logger from "./utils/logger";

class Server {
  private app: express.Application;
  private csrfProtection = csrf({ cookie: true });

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.database();
  }

  private routes(): void {
    // General routes
    this.app.use("/api/users", new UserRoutes().router);
    this.app.use("/api/url", new UrlRoutes().router);
    this.app.use(new CommonRoutes().router);

    // Error handler route
    this.app.use(apiErrorHandler);

    // Frontend production
    if (config.env === "production") {
      this.app.use(express.static("client/build"));
      this.app.get("*", (req, res) => {
        res.sendFile(
          path.resolve(__dirname, "../client", "build", "index.html")
        );
      });
    }
  }

  private middlewares(): void {
    this.app.enable("trust proxy");
    this.app.use(
      cors({
        origin: config.url,
        credentials: true,
      })
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(mongoSanitize());
    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(this.csrfProtection);
    this.app.use(httpLogger);
    this.app.use(
      compression({
        level: 6,
        threshold: 100 * 100,
        filter: (req, res) => {
          if (req.headers["x-no-compression"]) {
            return false;
          }
          return compression.filter(req, res);
        },
      })
    );
    if (config.env === "development") {
      this.app.use(morgan("dev"));
    }
  }

  private async database() {
    await connectDB();
  }

  public start(): void {
    this.app.listen(config.server.port, () => {
      logger.info(
        `API is running at http://${config.server.hostname}:${config.server.port}`
      );
    });
  }
}

export default Server;
