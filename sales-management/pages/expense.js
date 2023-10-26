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
    <div>
      <h1>Expense Page</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {expenseCategories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={editing ? handleEditExpense : handleAddExpense}>
          {editing ? "Edit Expense" : "Add Expense"}
        </button>
      </div>
      <div>
        {expenses.map((expense) => (
          <div key={expense.id}>
            {editing && editID === expense.id ? (
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {expenseCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleEditExpense(expense.id)}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p>Name: {expense.name}</p>
                <p>Amount: {expense.amount}</p>
                <p>Description: {expense.description}</p>
                <p>Category: {expense.category}</p>
                <button
                  onClick={() => {
                    setEditing(true);
                    setEditID(expense.id);
                    setName(expense.name);
                    setAmount(expense.amount);
                    setDescription(expense.description);
                    setCategory(expense.category);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteExpense(expense.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <p>Total Expense: {totalExpense}</p>
      </div>
    </div>
  );
};

export default Expense;
