import mongoose from "mongoose";

const productMasterSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
    trim: true,
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    required: true,
    trim: true,
  },
});

export const ProductMaster = mongoose.model(
  "ProductMaster",
  productMasterSchema
);
