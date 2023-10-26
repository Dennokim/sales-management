import React, { useState, useEffect } from "react";
import {
  addIncome,
  getIncome,
  editIncome,
  deleteIncome,
} from "../firebase/finance/income/income";

const Money = () => {
  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editing, setEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    const fetchIncome = async () => {
      await getIncome(setIncome);
    };
    fetchIncome();
  }, []);

  useEffect(() => {
    let total = 0;
    income.forEach((income) => {
      total += parseFloat(income.amount); // assuming the amount is in string format
    });
    setTotalIncome(total);
  }, [income]);

  const handleAddIncome = () => {
    addIncome(name, amount, description, category);
  };

  const handleEditIncome = (id, incomeName, newAmount, newDescription) => {
    editIncome(id, incomeName, newAmount, newDescription);
    setEditing(false);
    setEditID(null);
  };

  const handleDeleteIncome = (id, name) => {
    deleteIncome(id, name);
  };

  return (
    <div>
      <h1>Income Page</h1>
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
        <button onClick={handleAddIncome}>Add Income</button>
      </div>
      <div>
        {income.map((income) => (
          <div key={income.id}>
            {editing && editID === income.id ? (
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
                    handleEditIncome(income.id, name, amount, description)
                  }
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p>Name: {income.name}</p>
                <p>Amount: {income.amount}</p>
                <p>Description: {income.description}</p>
                <button
                  onClick={() => {
                    setEditing(true);
                    setEditID(income.id);
                    setName(income.name);
                    setAmount(income.amount);
                    setDescription(income.description);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteIncome(income.id, income.name)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <p>Total Income: {totalIncome}</p>
      </div>
    </div>
  );
};

export default Money;
