import React, { useState, useEffect } from "react";
import {
  addExpense,
  getExpense,
  editExpense,
  deleteExpense,
} from "../firebase/finance/expense/expense";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editing, setEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    getExpense(setExpenses);
  }, []);

  const handleAddExpense = () => {
    addExpense(name, amount, description, category);
  };

  const handleEditExpense = (id, expenseName, newAmount, newDescription) => {
    editExpense(id, expenseName, newAmount, newDescription);
    setEditing(false);
    setEditID(null);
  };

  const handleDeleteExpense = (id, name) => {
    deleteExpense(id, name);
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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {/* Options for categories */}
        </select>
        <button onClick={handleAddExpense}>Add Expense</button>
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
                <button
                  onClick={() =>
                    handleEditExpense(expense.id, name, amount, description)
                  }
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p>Name: {expense.name}</p>
                <p>Amount: {expense.amount}</p>
                <p>Description: {expense.description}</p>
                <button
                  onClick={() => {
                    setEditing(true);
                    setEditID(expense.id);
                    setName(expense.name);
                    setAmount(expense.amount);
                    setDescription(expense.description);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteExpense(expense.id, expense.name)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expense;
