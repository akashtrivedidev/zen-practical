import express from "express";
import ProductController from "../controllers/ProductController.js";

const productRouter = express.Router();

productRouter.get("/", ProductController.index);

export default productRouter;
