import mongoose from "mongoose";

const invoiceMasterSchema = new mongoose.Schema({
  invoice_no: {
    type: Number,
    default: 1, // Initial value, will be incremented based on last invoice
    required: true,
  },
  invoice_date: {
    type: Date,
    default: Date.now, // Sets to current date and time
    required: true,
  },
  customer_name: {
    type: String,
    required: true, // User-entered customer name
    trim: true,
  },
  total_amount: {
    type: Number,
    required: true, // Sum of total amount of all products added
    min: 0, // Ensures non-negative values
  },
});

export const InvoiceMaster = mongoose.model(
  "InvoiceMaster",
  invoiceMasterSchema
);
