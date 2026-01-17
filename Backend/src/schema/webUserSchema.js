import { Schema } from "mongoose";
import userPaginate from "mongoose-paginate-v2";
import { type } from "os";

let webUserSchema = Schema(
  {
    fullName: {
      type: String,
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },

    role: {
      type: String,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    gender: {
      type: String,
    },

    dob: {
      type: Date,
    },
    resetOtp: {
      type: String,
    },
    resetOtpExpiry: {
      type: Date,
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
webUserSchema.plugin(userPaginate);
export default webUserSchema;
