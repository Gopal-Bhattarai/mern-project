import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },

   brandShort_name: {
      type: String,
      required: true,
      unique: true,
    },
    brandThumbnail: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);
const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
