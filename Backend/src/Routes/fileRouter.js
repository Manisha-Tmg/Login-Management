import { Router } from "express";
import handleSingleFileController from "../controller/fileController.js";
import upload from "../utils/upload.js";

const fileRouter = Router();

fileRouter
  .route("/single")
  .post(upload.single("docs"), handleSingleFileController);

export default fileRouter;
