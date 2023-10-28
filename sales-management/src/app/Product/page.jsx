"use client";

import React, { useState, useEffect } from "react";
import {
  addProduct,
  deleteProduct,
  getProducts,
} from "../../../firebase/product/product";
import { getCategories } from "../../../firebase/category/category";
import Layout from "../components/Layout";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      await getProducts(setProducts);
    };
    fetchProducts();

    const fetchCategories = async () => {
      await getCategories(setCategories);
    };
    fetchCategories();
  }, []);

  const handleAddProduct = async () => {
    if (name && price && stock && selectedCategory) {
      await addProduct(name, price, stock, selectedCategory, description);
      setName("");
      setPrice(0);
      setStock(0);
      setSelectedCategory("");
      setDescription("");
    }
  };

  const handleDeleteProduct = async (id, name) => {
    await deleteProduct(id, name);
  };

  return (
    <Layout>
      <div>
        <h1>Product Page</h1>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>Name: {product.name}</p>
              <p>Price: {product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>Description: {product.description}</p>
              <button
                onClick={() => handleDeleteProduct(product.id, product.name)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Product;
