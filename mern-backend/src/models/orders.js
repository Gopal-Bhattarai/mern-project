import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        productName : {
            type : String,
            required : true,
        },
        brandName : {
            type : String,
            required : true,
        },
        customerName : {
            type : String,
            required : true,
        },
        customerPhone : {
            type : Number,
            required : true,
        },
        customerEmail : {
            type : String,
        },
        customerLocation : {
            type : String,
            required : true,
        },
        paymentMethod :{
            type : String,
            required : true,
        },
        quantityinStock : {
            type : Number,
            required : true,
        },
        price : {
            type : Number,
            required : true,
       },
       deliveryCharge : {
            type : Number,
            required : true,
       },
       discount : {
        type : Number,
       }
    },
    {
        timeStamps : true,
    }
);
const Order = mongoose.model("order", orderSchema);

export default Order;