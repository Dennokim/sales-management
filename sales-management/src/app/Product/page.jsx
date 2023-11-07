"use client";

import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../../../firebase/product/product";
import Layout from "../components/Layout";
import ProductForm from "../components/form/productForm";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await getProducts(setProducts);
  };

  const handleDeleteProduct = async (id, name) => {
    await deleteProduct(id, name);
    fetchProducts();
  };

  return (
    <Layout>
      <div className="relative">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl mb-5">Products</h1>
          <button
            onClick={() => setIsAddingProduct(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
        <div className={`${isAddingProduct ? "opacity-50" : ""}`}>
          {products.map((product) => (
            <div key={product.id} className="p-4 border-b border-gray-200 flex">
              <div className="w-1/5">
                <h2 className="font-bold text-lg">{product.name}</h2>
              </div>
              <div className="w-1/5">
                <p>Price: {product.price}</p>
              </div>
              <div className="w-1/5">
                <p>Stock: {product.stock}</p>
              </div>
              <div className="w-1/5">
                <p>Description: {product.description}</p>
              </div>
              <div className="w-1/5">
                <button
                  onClick={() => handleDeleteProduct(product.id, product.name)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {isAddingProduct && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <ProductForm
              onProductAdded={() => {
                fetchProducts();
                setIsAddingProduct(false);
              }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;
