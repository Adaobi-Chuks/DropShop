import  "express-async-errors";
import app from "./app";
import { logger } from "./middlewares/errors.middleware";
import connectToPostgres from "./configs/database.configs"
import {PORT} from "./configs/constants.config"
// import createAssociations from "./associations/index.associations";

(async () => {
  await connectToPostgres();
  logger.info(`Attempting to run server on port ${PORT}`);
  // createAssociations();
  app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
  });
})();