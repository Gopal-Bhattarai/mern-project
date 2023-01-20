import express from "express";
import { getAllUsers, getAllDeletedUsers, deleteUser, deleteForceUser, restoreUser, changeRole, changeIsActive, resetPassword } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.route("/users").get(getAllUsers);
adminRouter.route("/users/true").get(getAllUsers);
adminRouter.route("/users/false").get(getAllDeletedUsers);


adminRouter.route("/users/resetpassword/:id").post(resetPassword);
adminRouter.route("/users/delete/:id").delete(deleteUser);
adminRouter.route("/users/delete/force/:id").delete(deleteForceUser);
adminRouter.route("/users/restore/:id").get(restoreUser);
adminRouter.route("/users/rolechange/:id/:role").put(changeRole);
adminRouter.route("/users/activechange/:id/:isActive").put(changeIsActive);


export default adminRouter;