import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Product from "./models/Product";
import productRoute from "./routes/productRoute";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";
import cartRoute from "./routes/cartRoute";
import sequelize from "./sequalize";
import Cart from "./models/Cart";
import "./models/db";
import { authenticationToken, isAdmin } from "./middlewere/middlewere";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Hello Alan" });
});

app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/cart", cartRoute);

app.use("/protected", authenticationToken, isAdmin, (req, res) => {
  res.status(200).json({ message: "This is proteced route" });
});

// Product.findAll()
//   .then((products) => {
//     console.log("All Products", JSON.stringify(products, null, 2));
//   })
//   .catch((error) => {
//     console.log("Error in find Product", error);
//   });

const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Data and Models are synced");
    app.listen(5001, () => {
      console.log("server is running on port 5001...");
    });
  } catch (error) {
    console.log("error while syncing the models, ", error);
  }

  // await Cart.sync({ alter: true }).then(() => {
  //   console.log("Cart synced");
  // });

  // await sequelize
  //   .sync()
  //   .then(() => {
  //     app.listen(5001, () => {
  //       console.log("Server is running in port 5001");
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("Error while syncing database");
  //   });
};

startServer();
