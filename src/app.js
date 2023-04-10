import express from "express";
import mongoose from "mongoose"
import productRouter from "../router/products";
import userRouter from "../router/auth"
import categoryRouter from "../router/category"
import cors from "cors";
const app = express();

app.use(express.json())
app.use(cors());

app.use("/api", productRouter);
app.use("/api", userRouter)
app.use("/api", categoryRouter)

mongoose.connect("mongodb://127.0.0.1:27017/we17301");

export const viteNodeApp = app;