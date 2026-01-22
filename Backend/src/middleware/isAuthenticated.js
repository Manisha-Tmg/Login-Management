import expressAsyncHandler from "express-async-handler";
import { secretKey } from "../config.js";
import jwt from "jsonwebtoken";

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  let bearerToken = req.headers.authorization;
  if (bearerToken) {
    let token = bearerToken.split(" ")[1];
    let info = jwt.verify(token, secretKey);
    req.id = info.id;
    console.log(req.id);
    next();
    console.log(info);
  } else {
    res.status(401).json({
      message: false,
      message: "User not found",
    });
  }
});

export default isAuthenticated;
