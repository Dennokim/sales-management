"use client";

import React, { useState, useEffect } from "react";
import {
  addCategory,
  deleteCategory,
  getCategories,
} from "../../../firebase/category/category";
import Layout from "../components/Layout";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = async () => {
    if (newCategoryName) {
      await addCategory(newCategoryName);
      setNewCategoryName("");
    }
  };

  const handleDeleteCategory = async (id, name) => {
    await deleteCategory({ id, name });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      await getCategories(setCategories);
    };
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div>
        <h1 className="font-bold text-xl mb-5">Categories</h1>
        <h2 className="font-medium text-lg mb-5">Add product category</h2>
        <div className="mb-10">
          <div className="mt-10 r">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="ml-3 px-3 py-2 border rounded"
            />
            <button
              onClick={handleAddCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-3"
            >
              Add Category
            </button>
          </div>
        </div>
        <ul className="border-b border-gray-200">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between items-center mb-3 border-b border-gray-200"
            >
              <div>
                <p>{category.name}</p>
              </div>
              <div>
                <button
                  onClick={() =>
                    handleDeleteCategory(category.id, category.name)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Categories;
