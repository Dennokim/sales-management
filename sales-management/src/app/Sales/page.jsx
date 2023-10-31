"use client";

import React, { useState, useEffect } from "react";
import { getSales } from "../../../firebase/sales/sales";
import Layout from "../components/Layout";
import SalesForm from "../components/salesForm";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [openSaleId, setOpenSaleId] = useState(null);

  useEffect(() => {
    getSales(setSales);
  }, []);

  const handleSalesAdded = () => {
    setShowForm(false);
    getSales(setSales);
  };

  const toggleDetails = (id) => {
    if (openSaleId === id) {
      setOpenSaleId(null);
    } else {
      setOpenSaleId(id);
    }
  };

  return (
    <Layout>
      <div className={`relative ${showForm ? "opacity-50" : ""}`}>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded absolute top-0 right-0 m-4"
        >
          Add Sales
        </button>
        <h1 className="text-2xl font-bold mb-5">Sales</h1>
        {sales.map((sale) => (
          <div key={sale.id} className="border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div>
                <p>Sale ID: {sale.id}</p>
                <p>Product: {sale.products[0]?.name || "No product"}</p>
              </div>
              <div>
                <button onClick={() => toggleDetails(sale.id)}>
                  {openSaleId === sale.id ? "Hide Details" : "View Details"}
                </button>
              </div>
            </div>
            {openSaleId === sale.id && (
              <div>
                <p>Customer Name: {sale.customerName}</p>
                <p>Customer Email: {sale.customerEmail}</p>
                {Array.isArray(sale.products) ? (
                  sale.products.map((item, index) => (
                    <div key={index}>
                      <p>Product: {item.name}</p>
                      <p>Price: {item.amount}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  ))
                ) : (
                  <p>No products found for this sale</p>
                )}
                  <p
                    style={{
                      color: "blue",
                      fontWeight: "bold",
                      textAlign: "end"
                    }}
                  >
                    Total Amount: {sale.totalAmount}
                  </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {showForm && <SalesForm onSalesAdded={handleSalesAdded} />}
    </Layout>
  );
};

export default Sales;
