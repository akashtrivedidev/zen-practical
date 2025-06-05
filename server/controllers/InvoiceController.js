import { InvoiceDetail } from "../models/InvoiceDetailModel.js";
import { InvoiceMaster } from "../models/InvoiceMasterModel.js";

export default class InvoiceController {
  static async create(request, response, next) {
    let totalInvoices = (await InvoiceMaster.find()).length;

    let newInvoice = {
      invoice_no: totalInvoices + 1,
      invoice_date: new Date(),
      customer_name: request.body.customer_name,
      total_amount: 0,
    };

    let total_invoice_amt = 0;
    if (!request.body.products) {
      response.send({ success: "false", error: "Empty Products" });
    }

    let products = request.body.products;
    for (let i = 0; i < products.length; i++) {
      total_invoice_amt += Number(products[i].total_amt);
    }
    newInvoice.total_amount = total_invoice_amt;
    let masterInvoice = await InvoiceMaster.create(newInvoice);
    const masterInvoiceId = masterInvoice.id;

    for (let i = 0; i < products.length; i++) {
      let p = products[i];
      let newIncoiceDetail = {
        invoice_id: masterInvoiceId,
        product_id: p._id,
        rate: Number(p.rate),
        unit: p.unit,
        qty: Number(p.qty),
        discount: Number(p.discount),
        net_amt: Number(p.net_amt),
        total_amt: Number(p.total_amt),
      };
      let temp = await InvoiceDetail.create(newIncoiceDetail);
    }
    response.status(201).json({ success: "ok" });
  }
}
