import {Sequelize} from "sequelize";
import { logger } from "../middlewares/errors.middleware";
const config = {
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

export default async function() {
    const sequelize = new Sequelize(config);
    try {
      await sequelize.authenticate();
      logger.info("Connection to postgreSQL has been established successfully")
      return sequelize;
    } catch (error) {
      logger.error("Unable to connect to postgreSQL database:", error)
    }
}