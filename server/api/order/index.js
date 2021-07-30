import express from "express";
import { getOrderInfo } from "../controller/order.controller";

const OrderRouter = express.Router();

OrderRouter.get("/info/:orderId", (req, res) => {
  return getOrderInfo(req, res);
});

export default OrderRouter;
