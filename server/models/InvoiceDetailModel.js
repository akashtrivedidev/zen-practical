import mongoose from "mongoose";

// Define the Invoice_Detail schema
const invoiceDetailSchema = new mongoose.Schema({
  invoice_id: {
    type: String, // References invoice_id from Invoice_Master
    required: true,
    ref: "InvoiceMaster", // References the InvoiceMaster model
  },
  product_id: {
    type: String, // ID of the selected product
    required: true,
    ref: "ProductMaster", // References the ProductMaster model
  },
  rate: {
    type: Number, // Rate as entered or fetched
    required: true,
    min: 0, // Ensures non-negative values
  },
  unit: {
    type: String, // Unit as entered or fetched
    required: true,
    trim: true,
  },
  qty: {
    type: Number, // Quantity as entered
    required: true,
    min: 0, // Ensures non-negative values
  },
  discount: {
    type: Number, // Discount percentage as entered
    required: true,
    min: 0, // Ensures non-negative values
    max: 100, // Ensures percentage doesn't exceed 100
  },
  net_amt: {
    type: Number, // Net amount as calculated or entered
    required: true,
    min: 0, // Ensures non-negative values
  },
  total_amt: {
    type: Number, // Total amount as calculated or entered
    required: true,
    min: 0, // Ensures non-negative values
  },
});

// Create the model
export const InvoiceDetail = mongoose.model(
  "InvoiceDetail",
  invoiceDetailSchema
);
