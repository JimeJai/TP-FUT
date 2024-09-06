import express, { json } from "express";
import indexRouter from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();
app.use(json());

app.use("/status", (req, res) =>
  res.json({ environment: process.env.ENVIRONMENT })
);
app.use("/", indexRouter);

app.use(errorHandler);

export default app;
