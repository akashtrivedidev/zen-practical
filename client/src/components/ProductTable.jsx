export default function ProductTable(props) {
  const { products, deleteProduct } = props;
  return (
    <table class="table shadow-sm">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Rate</th>
          <th scope="col">Unit</th>
          <th scope="col">Qty</th>
          <th scope="col">Discount%</th>
          <th scope="col">Net Amt</th>
          <th scope="col">Total Amt</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr>
            <td>{product.product_name}</td>
            <td>{product.rate}</td>
            <td>{product.unit}</td>
            <td>{product.qty}</td>
            <td>{product.discount}</td>
            <td>{product.net_amt}</td>
            <td>{product.total_amt}</td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                onClick={(e) => deleteProduct(product.uid)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
