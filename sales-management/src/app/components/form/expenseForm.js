"use client";

import React, { useEffect, useState } from "react";
import { addExpense } from "../../../../firebase/finance/expense/expense";
import { getExpenseCategory } from "../../../../firebase/finance/category/category";

const ExpenseForm = ({ onExpenseAdded }) => {
  const [name, setName] = useState(" ");
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState(" ");
  const [category, setCategory] = useState(" ");
  const [expenseCategories, setExpenseCategories] = useState([]);

  useEffect(() => {
    getExpenseCategory(setExpenseCategories);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExpense({ name, amount, description, category });
    setName(" ");
    setAmount("");
    setDescription(" ");
    setCategory(" ");
    if (onExpenseAdded) {
      onExpenseAdded();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white p-5 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5 text-center">Add Expense</h2>
        <input
          type="text"
          placeholder="Enter name of expense"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3"
        />
        <input
          type="number"
          placeholder="Enter amount spent"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full mb-3"
        />
        <input
          type="text"
          placeholder="Enter description for the expense"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full mb-3"
        >
          <option value=" ">Select Category</option>
          {expenseCategories.map((category) => (
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
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
