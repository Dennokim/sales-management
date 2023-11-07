"use client";

import React, { useState, useEffect } from "react";
import { addSales } from "../../../../firebase/sales/sales";

const SalesForm = ({ onSaleAdded }) => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [saleItems, setSaleItems] = useState([]);
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState();
  const [quantity, setQuantity] = useState();

  const handleAddSale = async () => {
    if (customerName && customerEmail && product && amount && quantity) {
      await addSales(customerName, customerEmail, product, amount, quantity);
      setCustomerName("");
      setCustomerEmail("");
      setProduct("");
      setAmount(0);
      setQuantity(1);
      onSaleAdded();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white p-5 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5 text-center">Add Sale</h2>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer Name"
          className="border p-2 w-full mb-3"
        />
        <input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="Customer Email"
          className="border p-2 w-full mb-3"
        />
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Product"
          className="border p-2 w-full mb-3"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="border p-2 w-full mb-3"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          className="border p-2 w-full mb-3"
        />
        <button
          onClick={handleAddSale}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Sale
        </button>
      </div>
    </div>
  );
};

export default SalesForm;
