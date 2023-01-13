import express from "express";
import {
    createBrand,
    deleteBrand,
    findBrand,
    listBrands,
  } from "../controllers/brandsController.js";

const brandsRouter = express.Router();

brandsRouter.route("/").post(createBrand).get(listBrands);
brandsRouter.route("/:id").get(findBrand).delete(deleteBrand);

export default brandsRouter;