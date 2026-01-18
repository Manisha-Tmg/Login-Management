import { Schema } from "mongoose";
import reviewPaginate from "mongoose-paginate-v2";

let reviewSchema = Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    product: {
      type: Schema.ObjectId,
      ref: "Product",
      required: [true, "product is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);
reviewSchema.plugin(reviewPaginate);
export default reviewSchema;
