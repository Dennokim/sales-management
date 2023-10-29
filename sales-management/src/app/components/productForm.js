import React, { useState, useEffect } from "react";
import { addProduct } from "../../../firebase/product/product";
import { getCategories } from "../../../firebase/category/category";

const ProductForm = ({ onProductAdded }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [description, setDescription] = useState("");

  useEffect(() => {
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
      onProductAdded();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white p-5 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5 text-center">Add Product</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 w-full mb-3"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border p-2 w-full mb-3"
        />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          className="border p-2 w-full mb-3"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 w-full mb-3"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 w-full mb-3"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
