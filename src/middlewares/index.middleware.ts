import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import asyncError from "./errors.middleware";

// import indexRoutes from "../routes/index.routes";

export default (app: Application) => {
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());
  // indexRoutes(app);

  app.use(asyncError);
};
