import mongoose from "mongoose";

import config from "../configs/config";
import logger from "./logger";

const connectDB = async (): Promise<void> => {
  const connection = mongoose.connection;
  connection.on("connected", () => {
    logger.info("Mongo Connection Established");
  });
  connection.on("reconnected", () => {
    logger.info("Mongo Connection Reestablished");
  });
  connection.on("disconnected", () => {
    logger.info("Mongo Connection Disconnected");
    logger.info("Trying to reconnect to Mongo ...");
    setTimeout(() => {
      mongoose.connect(config.mongo.url, config.mongo.options);
    }, 3000);
  });
  connection.on("close", () => {
    logger.info("Mongo Connection Closed");
  });
  connection.on("error", (error: Error) => {
    logger.info("Mongo Connection ERROR: " + error);
  });

  const run = async () => {
    await mongoose.connect(config.mongo.url, config.mongo.options);
  };
  run().catch((error) => logger.error(error));
};
export default connectDB;
