import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import productRouter from "./app/routes/product.route.js";
import categoryRouter from "./app/routes/category.route.js";
import cartRouter from "./app/routes/cart.route.js";
import orderRouter from "./app/routes/order.route.js";
import userRouter from "./app/routes/user.route.js";

import * as dotenv from "dotenv";
dotenv.config();

// Connect mongodb by mongoose
mongoose.connect(process.env.DB, () => {
  console.log("Connect to MongoDB successfully!!!");
});

const app = express();

app.use(cors());
app.use(express.json({ limit: "70mb" }));
app.use(express.urlencoded({ limit: "70mb", extended: true }));
// routes
app.use("/products", productRouter);
app.use("/categorys", categoryRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);
app.use("/users", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
export default app;
