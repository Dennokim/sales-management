"use client";

import React, { useState, useEffect } from "react";
import { addIncome } from "../../../../firebase/finance/income/income";
import { getIncomeCategory } from "../../../../firebase/finance/category/category";

const IncomeForm = ({ onIncomeAdded }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [incomeCategories, setIncomeCategories] = useState([]);

  useEffect(() => {
    getIncomeCategory(setIncomeCategories);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addIncome(name, amount, description, category);
    setName("");
    setAmount("");
    setDescription("");
    setCategory("");
    if (onIncomeAdded) {
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
          placeholder="Income Name"
          className="border p-2 w-full mb-3"
        />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Income Amount"
          className="border p-2 w-full mb-3"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Income Description"
          className="border p-2 w-full mb-3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full mb-3"
        >
          <option value="">Select Category</option>
          {incomeCategories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default IncomeForm;
