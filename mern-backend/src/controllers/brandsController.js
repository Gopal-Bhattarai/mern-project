import expressAsyncHandler from "express-async-handler";
import Brand from "../models/brand.js";

export const createBrand = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { brandName, brandShort_name, brandThumbnail, ...rest } = req.body;
  try {
    const brand = await Brand.create({
      brandName,
      brandShort_name,
      brandThumbnail,
      ...rest,
    });
    console.log(brand);
    res.send({ status: "Brand created!", brand });
  } catch (err) {
    console.log(err);
    res.send({ status: "error creating brand!" });
  }
});

export const listBrands = expressAsyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find({});
    console.log(brands);
    res.send({ status: "Brand Listed!", brands });
  } catch (err) {
    console.log(err, ">>>> error");
    res.send({ status: "error getting brands!" });
  }
});

export const findBrand = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(req.params, id);
  try {
    const brand = await Brand.findById(id);
    console.log(brand);
    res.send({ status: "brand data retrieved!", brand });
  } catch (err) {
    console.log(err, ">>>>>> error");
    res.send({ status: "error getting brand data!" });
  }
});

export const deleteBrand = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(req.params, id);
  try {
    const brand = await Brand.findOneAndDelete({ _id: id });
    console.log(brand);
    res.send({ status: "Brand Deleted!", brand });
  } catch (err) {
    console.log(err, ">>>>> error");
    res.send({ status: "error deleting brand data!" });
  }
});
