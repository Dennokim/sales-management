"use client";

import React, { useState, useEffect } from "react";
import { addIncome } from "../../../firebase/finance/income/income";
import { getIncomeCategory } from "../../../firebase/finance/category/category";

const IncomeForm = ({ onIncomeAdded }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      await getIncomeCategory(setCategories);
    };
    fetchCategories();
  }, []);

  const handleAddIncome = async () => {
    if (name && amount && selectedCategory) {
      await addIncome(name, amount, selectedCategory, description);
      setName("");
      setAmount("");
      setSelectedCategory("");
      setDescription("");
      onIncomeAdded();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white p-5 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5 text-center">Add Income</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 w-full mb-3"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
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
          onClick={handleAddIncome}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default IncomeForm;
