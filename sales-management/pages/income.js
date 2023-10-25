import React, { useState, useEffect } from "react";
import {
  addIncome,
  getIncome,
  editIncome,
  deleteIncome,
} from "../firebase/finance/income/income";

const IncomePage = () => {
  const [income, setIncome] = useState([]);
  const [newIncome, setNewIncome] = useState({
    name: "",
    amount: 0,
    description: "",
    category: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    const fetchIncome = async () => {
      await getIncome(setIncome);
    };
    fetchIncome();
  }, []);

  const handleAddIncome = async () => {
    await addIncome(
      newIncome.name,
      newIncome.amount,
      newIncome.description,
      newIncome.category
    );
    setNewIncome({ name: "", amount: 0, description: "", category: "" });
  };

  const handleEditIncome = async (id, newName, newAmount, newDescription) => {
    await editIncome(id, newName, newAmount, newDescription);
    setEditMode(false);
    setEditID(null);
  };

  const handleDeleteIncome = async (id, name) => {
    await deleteIncome(id, name);
  };

  return (
    <div>
      <h1>Income Page</h1>
      <h2>Add Income</h2>
      <form onSubmit={handleAddIncome}>
        <input
          type="text"
          value={newIncome.name}
          onChange={(e) => setNewIncome({ ...newIncome, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="number"
          value={newIncome.amount}
          onChange={(e) =>
            setNewIncome({ ...newIncome, amount: e.target.value })
          }
          placeholder="Amount"
        />
        <input
          type="text"
          value={newIncome.description}
          onChange={(e) =>
            setNewIncome({ ...newIncome, description: e.target.value })
          }
          placeholder="Description"
        />
        <input
          type="text"
          value={newIncome.category}
          onChange={(e) =>
            setNewIncome({ ...newIncome, category: e.target.value })
          }
          placeholder="Category"
        />
        <button type="submit">Add</button>
      </form>
      <h2>Income List</h2>
      <ul>
        {income.map((item) => (
          <li key={item.id}>
            {editMode && editID === item.id ? (
              <div>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    handleEditIncome(
                      item.id,
                      e.target.value,
                      item.amount,
                      item.description
                    )
                  }
                />
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) =>
                    handleEditIncome(
                      item.id,
                      item.name,
                      e.target.value,
                      item.description
                    )
                  }
                />
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    handleEditIncome(
                      item.id,
                      item.name,
                      item.amount,
                      e.target.value
                    )
                  }
                />
                <button
                  onClick={() =>
                    handleEditIncome(
                      item.id,
                      item.name,
                      item.amount,
                      item.description
                    )
                  }
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p>Name: {item.name}</p>
                <p>Amount: {item.amount}</p>
                <p>Description: {item.description}</p>
                <p>Category: {item.category}</p>
                <button
                  onClick={() => {
                    setEditMode(true);
                    setEditID(item.id);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteIncome(item.id, item.name)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomePage;
