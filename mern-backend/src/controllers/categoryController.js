import expressAsyncHandler from "express-async-handler";
import Category from "../models/category.js";

const registerCategory = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { category, ...rest } = req.body;
  try {
    const category = await Category.create({ category, ...rest });
    console.log(category);
    res.send({ status: "Category created", category });
  } catch (err) {
    console.log(err);
    res.send({ status: "error creating category!" });
  }
});

const createCategory = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { category, ...rest } = req.body;
  try {
    const category = await Category.create({ category, ...rest });
    console.log(category);
    res.send({ status: "Category created",category });
  } catch (err) {
    console.log(err);
    res.send({ status: "error creating category!" });
  }
});

const getCategory = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    console.log(categories);
    res.send({ status: "Category Listed!", categories });
  } catch (err) {
    console.log(err, ">>>>>>>>> error");
    res.send({ status: "error getting categories!" });
  }
});
const deleteCategory = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(req.params, id);
  try {
    const category = await Category.findOneAndDelete({ _id: id });
    console.log(category);
    res.send({ status: "Category deleted!", category });
  } catch (err) {
    console.log(">>>>>>>>>>>> error");
    res.send({ status: "error deleting category data" });
  }
});

export { registerCategory, createCategory, getCategory, deleteCategory };
