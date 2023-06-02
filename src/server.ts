import  "express-async-errors";
import app from "./app";
import { logger } from "./middlewares/errors.middleware";
import connectToPostgres from "./configs/database.configs"
import {PORT} from "./configs/constants.config"

(async () => {
  await connectToPostgres();
  logger.info(`Attempting to run server on port ${PORT}`);

  app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
  });
})();