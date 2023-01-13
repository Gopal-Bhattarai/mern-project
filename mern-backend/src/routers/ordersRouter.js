import express from "express";
import {
  deleteOrder,
  createOrder,
  getOrder,
  registerOrder,
  getOrderById
} from "../controllers/ordersController.js";
const orderRouter = express.Router();

orderRouter.route("/").get(registerOrder).get(getOrder).post(createOrder);
orderRouter.route("/:id").get(getOrderById).delete(deleteOrder);

export default orderRouter;
