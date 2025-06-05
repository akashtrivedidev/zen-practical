import mongoose from "mongoose";

const invoiceMasterSchema = new mongoose.Schema({
  invoice_no: {
    type: Number,
    default: 1,
    required: true,
  },
  invoice_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
    trim: true,
  },
  total_amount: {
    type: Number,
    required: true,
    min: 0,
  },
});

export const InvoiceMaster = mongoose.model(
  "InvoiceMaster",
  invoiceMasterSchema
);
