import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import asyncError from "./errors.middleware";
import indexRoutes from "../routes/index.routes";

export default (app: Application) => {
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());
  indexRoutes(app);
  app.use(asyncError);
};