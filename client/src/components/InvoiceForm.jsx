import { useEffect, useState } from "react";
import { v4 } from "uuid";

export default function InvoiceForm(props) {
  const { addProduct, products } = props;
  const [currentInvoice, setCurrentInvoice] = useState({
    customer_name: "",
    uid: v4(),
    _id: "",
    product_name: "",
    rate: "",
    unit: "",
    qty: "",
    discount: 0,
    net_amt: 0,
    total_amt: 0,
  });
  const [currentProduct, setCurrentProduct] = useState({});

  function handleChange(event) {
    setCurrentInvoice((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  function updateCurrentProduct(event, productId) {
    for (let i = 0; i < products.length; i++) {
      if (products[i]._id == productId) {
        setCurrentProduct(products[i]);
        setCurrentInvoice((prev) => ({
          ...prev,
          _id: productId,
          unit: products[i].unit,
          rate: products[i].rate,
          product_name: products[i].product_name,
        }));
      }
    }
  }

  useEffect(() => {
    updateAmounts();
  }, [currentInvoice._id, currentInvoice.qty, currentInvoice.discount]);

  function updateAmounts() {
    if (currentProduct) {
      let net_amt = Number(currentProduct.rate) * Number(currentInvoice.qty);
      let total_amt =
        net_amt - (net_amt * Number(currentInvoice.discount)) / 100;
      net_amt = net_amt.toFixed(2);
      total_amt = total_amt.toFixed(2);
      setCurrentInvoice((prev) => {
        return {
          ...prev,
          net_amt,
          total_amt,
        };
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const t = { ...currentInvoice };
    setCurrentProduct(null);
    setCurrentInvoice({
      customer_name: "",
      uid: v4(),
      _id: "",
      product_name: "",
      rate: "",
      unit: "",
      qty: "",
      discount: 0,
      net_amt: 0,
      total_amt: 0,
    });
    addProduct(t);
  }

  return (
    <div className="mb-4">
      <h1 className="text-center mb-4">Create Invoice</h1>
      <form
        className="container p-4 border shadow-sm rounded"
        onSubmit={handleSubmit}
      >
        <div className="row pb-2">
          <div className="col-sm">
            <label htmlFor="customer-name">Customer Name</label>
            <input
              required
              onChange={handleChange}
              value={currentInvoice.customer_name}
              type="text"
              name="customer_name"
              className="form-control"
              id="customer-name"
              placeholder="Name"
            />
          </div>
          <div className="col-sm">
            <label htmlFor="exampleFormControlSelect1">Product</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              value={currentInvoice._id}
              onChange={(e) => updateCurrentProduct(e, e.target.value)}
            >
              <option value="" disabled selected>
                --select any one--
              </option>
              {products.map((product) => (
                <option
                  value={product._id}
                  selected={product._id == currentInvoice._id}
                >
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm">
            <label htmlFor="product-rate">Rate</label>
            <input
              required
              className="form-control"
              readOnly
              id="product-rate"
              value={currentProduct ? currentProduct.rate : 0}
            />
          </div>
        </div>

        <div className="row pb-2">
          <div className="col-sm">
            <label htmlFor="product-unit">Unit</label>
            <input
              required
              className="form-control"
              id="product-unit"
              value={currentProduct ? currentProduct.unit : 0}
              type="text"
            />
          </div>
          <div className="col-sm">
            <label htmlFor="product-qty">Qty</label>
            <input
              required
              className="form-control"
              id="product-qty"
              value={currentInvoice.qty}
              type="number"
              name="qty"
              min={1}
              onChange={(e) => {
                handleChange(e);
                updateAmounts();
              }}
            />
          </div>
          <div className="col-sm">
            <label htmlFor="product-discount">Discount%</label>
            <input
              required
              className="form-control"
              id="product-discount"
              type="number"
              step={0.1}
              name="discount"
              onChange={handleChange}
              value={currentInvoice.discount}
              min={0}
              max={100}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <label htmlFor="net-amt">Net Amount</label>
            <input
              required
              type="number"
              name="net-amt"
              id="net-amt"
              value={currentInvoice.net_amt}
              readOnly
              className="form-control"
            />
          </div>
          <div className="col-sm">
            <label htmlFor="total-amt">Total Amount</label>
            <input
              required
              type="number"
              name="total-amt"
              id="total-amt"
              value={currentInvoice.total_amt}
              readOnly
              className="form-control"
            />
          </div>
          <div className="col-sm">
            <button type="submit" className="btn btn-primary">
              ADD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
