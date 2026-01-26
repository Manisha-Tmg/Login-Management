import { Router } from "express";
import {
  createReviewController,
  deleteReviewController,
  readAllReviewController,
  readSpecificReviewController,
  updateReviewController,
} from "../controller/reviewController.js";

const reviewRouter = Router();

reviewRouter
  .route("/")
  .post(createReviewController)
  .get(readAllReviewController);

reviewRouter
  .route("/:id")
  .get(readSpecificReviewController)
  .patch(updateReviewController)
  .delete(deleteReviewController);

export default reviewRouter;
