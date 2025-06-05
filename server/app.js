import express from "express";
import productRouter from "./routes/productRoutes.js";
import mongoose from "mongoose";
import indexRouter from "./routes/indexRoutes.js";
import cors from "cors";
import invoiceRouter from "./routes/invoiceRoutes.js";

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const MONGO_URI =
  "mongodb+srv://akashxtrivedi:XTDcchuJHjSpK1P5@cluster0.czjyijj.mongodb.net/zen-practical";
mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/", indexRouter);
app.use("/products", productRouter);
app.use("/invoices", invoiceRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

app.listen(3000, () => {
  console.log("server listening to port" + 3000);
});
