import express from "express";
const Router = express.Router();

import inicis from "./inicis";
import order from "./order";

Router.use("/inicis", inicis);
Router.use("/order", order);

export default Router;
