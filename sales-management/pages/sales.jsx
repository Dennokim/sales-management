import React, { useState, useEffect } from "react";
import {
  addSales,
  getSales,
  getTotalSales,
  getSalesForDay,
} from "../firebase/sales/sales";
import { addIncome } from "../firebase/finance/income/income";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [date, setDate] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [saleItems, setSaleItems] = useState([]);
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    getSales(setSales);
    getTotalSales(setTotalSales);
  }, []);

  const handleAddSales = () => {
    const newSale = {
      customerName: customerName,
      customerEmail: customerEmail,
      products: saleItems,
      totalAmount: saleItems.reduce(
        (total, item) => total + item.amount * item.quantity,
        0
      ),
    };
    addSales(
      newSale.customerName,
      newSale.customerEmail,
      newSale.products,
      newSale.totalAmount,
      setAddNew
    );

    // Integrate addIncome function
    newSale.products.forEach((product) => {
      addIncome(
        product.name,
        product.amount * product.quantity,
        `Income from sales of ${newSale.customerName} (${product.name})`,
        "Sales"
      );
    });

    setSaleItems([]);
    setCustomerName("");
    setCustomerEmail("");
  };

  const handleAddItem = () => {
    const newItem = {
      name: product,
      amount: amount,
      quantity: quantity,
    };
    setSaleItems((prevItems) => [...prevItems, newItem]);
    setProduct("");
    setAmount(0);
    setQuantity(1);
  };

  const handleGetSalesForDay = () => {
    getSalesForDay(date, setSales);
  };

  return (
    <div>
      <h1>Add Sales</h1>
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Customer Email"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
      />
      <h2>Add Items to Sale</h2>
      <input
        type="text"
        placeholder="Product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleAddItem}>Add Item</button>
      <br />
      <br />
      <button onClick={handleAddSales}>Add Sales</button>

      <h1>All Sales</h1>
      {sales.map((sale) => (
        <div key={sale.id}>
          <p>Sale ID: {sale.id}</p>
          <p>Customer Name: {sale.customerName}</p>
          <p>Customer Email: {sale.customerEmail}</p>
          <p>Total Amount: {sale.totalAmount}</p>
          {sale.products.map((item, index) => (
            <div key={index}>
              <p>Product: {item.name}</p>
              <p>Price: {item.amount}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sales;
