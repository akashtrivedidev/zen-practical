import { useEffect, useState } from "react";
import "./App.css";
import InvoiceForm from "./components/InvoiceForm";
import axios, { HttpStatusCode } from "axios";
import ProductTable from "./components/ProductTable";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [invoice, setInvoice] = useState({
    customer_name: "",
    products: [],
  });

  const [products, setProducts] = useState([]);

  useEffect(async () => {
    let response = await axios.get("http://localhost:3000/products");
    if (response.status) {
      setProducts(response.data.products);
    }
  }, []);

  function addProduct(product) {
    let temp = [...invoice.products];
    temp.push(product);
    console.log(temp);

    setInvoice((prev) => {
      return {
        customer_name: product.customer_name,
        products: temp,
      };
    });
  }

  async function createInvoice() {
    if (invoice.products.length == 0) {
      alert("Add atleast one product");
      return;
    }
    let response = await axios.post("http://localhost:3000/invoices", invoice);
    if (response.status == HttpStatusCode.Created) {
      toast("Invoice Created Successfully");
      resetInvoice();
    }
  }

  function deleteProduct(id) {
    let p = invoice.products;
    let temp = [];
    for (let i = 0; i < p.length; i++) {
      if (p[i].uid != id) {
        temp.push(p[i]);
      }
    }

    setInvoice((prev) => ({
      customer_name: prev.customer_name,
      products: temp,
    }));
  }

  function resetInvoice() {
    setInvoice({
      customer_name: "",
      products: [],
    });
  }

  return (
    <div className="">
      <InvoiceForm addProduct={addProduct} products={products} />
      <ProductTable products={invoice.products} deleteProduct={deleteProduct} />
      <div className="d-flex gap-3 align-items-end">
        <button
          type="button"
          className="btn btn-primary"
          onClick={createInvoice}
        >
          Submit Invoice
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={resetInvoice}
        >
          Reset
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
