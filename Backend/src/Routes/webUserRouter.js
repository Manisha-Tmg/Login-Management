import { Router } from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  createUserController,
  loginController,
  profileWebUserController,
  readAllWebUserController,
  updatePasswordWebUserController,
  updateProfileWebUserCOntroller,
  verifyEmailController,
  forgotPasswordWebuserController,
  resetPasswordWebuserController,
  updateWebUserController,
  deleteWebUserController,
  readSpecificWebUserController,
} from "../controller/webUserController.js";
import isAuthorized from "../middleware/isAuthorized.js";

const webUserRouter = Router();
webUserRouter
  .route("/")
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superadmin"]),
    readAllWebUserController,
  );

webUserRouter.route("/register").post(createUserController);
webUserRouter.route("/verify-email").patch(verifyEmailController);
webUserRouter.route("/login").post(loginController);
webUserRouter
  .route("/my-profile")
  .get(isAuthenticated, profileWebUserController);
webUserRouter
  .route("/update-profile")
  .patch(isAuthenticated, updateProfileWebUserCOntroller);
webUserRouter
  .route("/update-password")
  .patch(isAuthenticated, updatePasswordWebUserController);
webUserRouter.route("/forgot-password").post(forgotPasswordWebuserController);
webUserRouter
  .route("/reset-password")
  .patch(isAuthenticated, resetPasswordWebuserController);
webUserRouter
  .route("/:id")
  .get(
    isAuthenticated,
    isAuthorized(["admin", "superadmin"]),
    readSpecificWebUserController,
  )
  .patch(
    isAuthenticated,
    isAuthorized(["admin", "superadmin"]),
    updateWebUserController,
  )
  .delete(
    isAuthenticated,
    isAuthorized(["superadmin"]),
    deleteWebUserController,
  );
export default webUserRouter;
