import expressAsyncHandler from "express-async-handler";
import Order from "../models/orders.js";

const registerOrder = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { productName, ...rest } = req.body;
  try {
    const order = await Order.create({ productName, ...rest });
    console.log(order);
    res.send({ status: "Order created", order });
  } catch (err) {
    console.log(err);
    res.send({ status: "error creating the order!" });
  }
});

const createOrder = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { productName, ...rest } = req.body;
  try {
    const order = await Order.create({ productName, ...rest });
    console.log(order);
    res.send({ status: "order created", order });
  } catch (err) {
    console.log(err);
    res.send({ status: "error creating order!" });
  }
});

const getOrderById = expressAsyncHandler (async(req,res)=>{
  const id = req.params.id;
  console.log(req.params,id);
  try{
    const order = await Order.findById({_id:id});
    console.log(order);
    res.send({status : "Order listed", order})
}
catch(err){
  console.log(">>>>>>>>>>>>> error");
  res.send({status: "error finding order data"});
}
})

const getOrder = expressAsyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({});
    console.log(orders);
    res.send({ status: "Order Listed!", orders });
  } catch (err) {
    console.log(err, ">>>>>>>>> error");
    res.send({ status: "error getting the order!" });
  }
});

const deleteOrder = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(req.params, id);
  try {
    const order = await Order.findOneAndDelete({ _id: id });
    console.log(order);
    res.send({ status: "Order deleted!", order });
  } catch (err) {
    console.log(">>>>>>>>>>>>> error");
    res.send({ status: "error deleting order" });
  }
});

export {createOrder, getOrder, deleteOrder,getOrderById,registerOrder };
