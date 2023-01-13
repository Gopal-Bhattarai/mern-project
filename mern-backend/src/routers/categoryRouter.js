import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.route("/").get(getCategory).post(createCategory);
categoryRouter.route("/:id").get(getCategory).delete(deleteCategory);

export default categoryRouter
