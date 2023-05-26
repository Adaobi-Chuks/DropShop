import  "express-async-errors";
import app from "./app";
import { logger } from "./middlewares/errors.middleware";
import connectToPostgres from "./config/database.config"

const PORT = process.env.PORT;

connectToPostgres()
  .then((sequelize) => {
    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to connect to PostgreSQL:', error);
    process.exit(1);
  });