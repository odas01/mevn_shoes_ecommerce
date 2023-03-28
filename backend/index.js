import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import config from "./app/config/index.js";
import productRouter from "./app/routes/product.route.js";
import categoryRouter from "./app/routes/category.route.js";
import cartRouter from "./app/routes/cart.route.js";
import orderRouter from "./app/routes/order.route.js";
import userRouter from "./app/routes/user.route.js";
import ApiError from "./app/api-error.js";

// Connect mongodb by mongoose
mongoose.connect(config.db.uri, () => {
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

const port = config.app.port || 5000;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
export default app;
