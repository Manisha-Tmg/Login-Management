import { model } from "mongoose";
import productSchema from "./productSchema.js";
import reviewSchema from "./reviewSchema.js";
import webUserSchema from "./webUserSchema.js";

export const Product = model("Product", productSchema);
export const Review = model("Review", reviewSchema);
export const WebUser = model("WebUser", webUserSchema);
