import React, { useState, useEffect } from "react";
import {
  addExpenseCategory,
  getExpenseCategory,
  addIncomeCategory,
  getIncomeCategory,
} from "../firebase/finance/category/category";

const Choose = () => {
  const [expenseCategory, setExpenseCategory] = useState([]);
  const [incomeCategory, setIncomeCategory] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [incomeName, setIncomeName] = useState("");

  useEffect(() => {
    const fetchExpenseCategory = async () => {
      await getExpenseCategory(setExpenseCategory);
    };

    const fetchIncomeCategory = async () => {
      await getIncomeCategory(setIncomeCategory);
    };

    fetchExpenseCategory();
    fetchIncomeCategory();
  }, []);

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    addExpenseCategory(expenseName);
    setExpenseName("");
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    addIncomeCategory(incomeName);
    setIncomeName("");
  };

  return (
    <div>
      <div>
        <h2>Expense Categories</h2>
        <form onSubmit={handleExpenseSubmit}>
          <label>
            Add Expense Category:
            <input
              type="text"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
          </label>
          <button type="submit">Add Expense Category</button>
        </form>
        <ul>
          {expenseCategory.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Income Categories</h2>
        <form onSubmit={handleIncomeSubmit}>
          <label>
            Add Income Category:
            <input
              type="text"
              value={incomeName}
              onChange={(e) => setIncomeName(e.target.value)}
            />
          </label>
          <button type="submit">Add Income Category</button>
        </form>
        <ul>
          {incomeCategory.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Choose;
