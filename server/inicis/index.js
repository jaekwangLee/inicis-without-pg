import express from "express";
import {} from "./controller";

const Router = express.Router();
const InicisRouter = express.Router();

//common
InicisRouter.get("/new/order", (req, res) => {});

InicisRouter.post("/confirm/payment", (req, res) => {});

// pc
InicisRouter.get("/request/form", (req, res) => {});

InicisRouter.post("/popup/open", (req, res) => {});

InicisRouter.post("/pay/after", (req, res) => {});

// mobile
InicisRouter.get("/m/request/form", (req, res) => {});

InicisRouter.post("/m/pay/after", (req, res) => {});

Router.use("/inicis", InicisRouter);

export default Router;
