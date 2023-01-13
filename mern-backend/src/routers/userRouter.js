import express from "express";

import {
  registerUser,
  getUser,
  loginUser,
  emailVerificationUser,
  emailVerificationUserLink,
  forgotPassword,
  resetPassword,
  updateProfile,
  updateProfilePicture,
} from "../controllers/usersController.js";
import isAuthenticated from "../middleware/Authentication.js";
import { upload } from "../middleware/uploadAvatar.js";

const userRouter = express.Router();

//Authentication not required routes
userRouter.route("/login").post(loginUser);
userRouter.route("/signup").post(registerUser);
userRouter.route("/forgotpassword").post(forgotPassword);
userRouter.route("/resetpassword").post(resetPassword);
userRouter.route("/emailverification").get(emailVerificationUser);
userRouter.route("/emailverificationLink").get(emailVerificationUserLink);

//Authentication required routes
userRouter.route("/email/:email").get(isAuthenticated, getUser);
userRouter.route("/updateprofile").post(isAuthenticated, updateProfile);
userRouter.route("/avatar/:id").post(isAuthenticated, upload.single('avatar'), updateProfilePicture);

export default userRouter;
