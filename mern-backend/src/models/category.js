import mongoose from "mongoose";

const categorySchema = mongoose.Schema({

    category:{
        type :String,
        required:true,
    },
    brand:{
        type :String,
        required:true,
    },
    quantityinStock:{
        type : Number,
        required:true,
    },
})

const Category = mongoose.model("Category",categorySchema);

export default Category;
