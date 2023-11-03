"use client";

import React, { useState, useEffect } from "react";
import { addIncome } from "../../../firebase/finance/income/income";
import { getIncomeCategory } from "../../../firebase/finance/category/category";

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
    <form onSubmit={handleSubmit}>
      {/* Name Input */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Income Name"
      />
      {/* Amount Input */}
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Income Amount"
      />
      {/* Description Input */}
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Income Description"
      />
      {/* Category Selection */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {incomeCategories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      {/* Submit Button */}
      <button type="submit">Add Income</button>
    </form>
  );
};

export default IncomeForm;
