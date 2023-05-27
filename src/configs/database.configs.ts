import {Sequelize} from "sequelize";
import { logger } from "../middlewares/errors.middleware";
import { MESSAGES } from "./constants.config";
export const config = {
  dialect: 'postgres' as const,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : undefined,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  dialectOptions: {
    dateStrings: true,
  },
};

export const sequelize = new Sequelize(config);
export default async function() {
  try {
    await sequelize.authenticate();
    logger.info(MESSAGES.DATABASE.CONNECTED)
    return sequelize;
  } catch (error) {
    logger.error(MESSAGES.DATABASE.ERROR, error)
  }
}