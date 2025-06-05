/**
 * Task Routes
 *
 * Demonstrates:
 * - Express router
 * - Route parameters
 * - HTTP methods (GET, POST, PUT, DELETE)
 * - Controller pattern
 */

import express from "express";
import InvoiceController from "../controllers/InvoiceController.js";

const invoiceRouter = express.Router();

// prefix: tasks
invoiceRouter.post("/", InvoiceController.create);

export default invoiceRouter;
