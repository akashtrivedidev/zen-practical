import { ProductMaster } from "../models/ProductMasterModel.js";

export default class ProductController {
  static async index(request, response, next) {
    let products = await ProductMaster.find();
    response.send({ products, total: products.length });
  }
}
