import React, { useState, useEffect } from "react";
import {
  addExpense,
  getExpense,
  editExpense,
  deleteExpense,
} from "../firebase/finance/expense/expense";
import { getExpenseCategory } from "../firebase/finance/category/category";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    getExpense(setExpenses);
    getExpenseCategory(setExpenseCategories);
  }, []);

  useEffect(() => {
    let total = 0;
    expenses.forEach((expense) => {
      total += parseFloat(expense.amount); // assuming the amount is in string format
    });
    setTotalExpense(total);
  }, [expenses]);

  const handleAddExpense = () => {
    addExpense(name, amount, description, category);
    setName("");
    setAmount("");
    setDescription("");
    setCategory("");
  };

  const handleEditExpense = (id) => {
    editExpense(id, name, amount, description, category);
    setEditing(false);
    setEditID(null);
    setName("");
    setAmount("");
    setDescription("");
    setCategory("");
  };

  const handleDeleteExpense = (id) => {
    deleteExpense(id);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Expense Page</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mr-4 px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mr-4 px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mr-4 px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mr-4 px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
        >
          {expenseCategories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          onClick={editing ? handleEditExpense : handleAddExpense}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {editing ? "Edit Expense" : "Add Expense"}
        </button>
      </div>
      <div>
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between py-3 border-b"
          >
            <div>
              <p className="text-lg font-bold">{expense.name}</p>
              <p>Amount: {expense.amount}</p>
              <p>Description: {expense.description}</p>
              <p>Category: {expense.category}</p>
            </div>
            <div>
              {editing && editID === expense.id ? (
                <button
                  onClick={() => handleEditExpense(expense.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded-md mr-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditing(true);
                    setEditID(expense.id);
                    setName(expense.name);
                    setAmount(expense.amount);
                    setDescription(expense.description);
                    setCategory(expense.category);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md mr-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDeleteExpense(expense.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <p className="text-xl font-bold mt-4">Total Expense: {totalExpense}</p>
      </div>
    </div>
  );
};

export default Expense;
