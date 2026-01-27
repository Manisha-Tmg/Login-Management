import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  readAllProductController,
  readSpecificProductController,
  updateProductController,
} from "../controller/productController.js";

const productRouter = Router();

productRouter
  .route("/")
  .post(createProductController)
  .get(readAllProductController);

productRouter
  .route("/:id")
  .get(readSpecificProductController)
  .patch(updateProductController)
  .delete(deleteProductController);

export default productRouter;
