import React, { useState, useEffect } from "react";
import {
  addCategory,
  deleteCategory,
  getCategories,
} from "../firebase/category/category";
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
        <h1>Categories</h1>
        <div>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
          <button onClick={handleAddCategory}>Add Category</button>
        </div>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {category.name}
              <button
                onClick={() => handleDeleteCategory(category.id, category.name)}
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

export default Categories;
