import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import API_v1 from "./api";

const morgan = require("morgan");
require("dotenv").config();

const app = express();
const server = require("http").Server(app);

app.use(bodyParser.urlencoded({ extended: true, limit: "1536mb" }));
app.use(bodyParser.json({ limit: "1536mb" }));
app.use(cookieParser());

app.set(__dirname, "views");
app.set("view engine", "pug");

app.use(
  morgan("dev", {
    skip: (req, res) => {
      return res.statusCode < 400;
    },
    stream: process.stderr,
  })
);

app.use(
  morgan("dev", {
    skip: (req, res) => {
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  })
);

app.use("/static", express.static("static"));
app.use("/v1", API_v1);

server.listen(process.env.PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
