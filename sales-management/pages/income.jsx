import { useState, useEffect } from "react";
import {
  addIncome,
  editIncome,
  deleteIncome,
  getAllIncomes,
} from "../firebase/finance/income/income";
import { getIncomeCategory } from "../firebase/finance/category/category";

export default function IncomePage() {
  const [incomeData, setIncomeData] = useState([]);
  const [selectedIncomeId, setSelectedIncomeId] = useState(null);
  const [incomeName, setIncomeName] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeDescription, setIncomeDescription] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");
  const [incomeCategories, setIncomeCategories] = useState([]);

  useEffect(() => {
    getAllIncomes(setIncomeData);
    getIncomeCategory(setIncomeCategories);
  }, []);

  const handleAddIncome = async () => {
    await addIncome(
      incomeName,
      incomeAmount,
      incomeDescription,
      incomeCategory
    );
    setIncomeName("");
    setIncomeAmount("");
    setIncomeDescription("");
    setIncomeCategory("");
  };

  const handleEditIncome = async () => {
    await editIncome(
      selectedIncomeId,
      incomeName,
      incomeAmount,
      incomeDescription,
      incomeCategory
    );
    setSelectedIncomeId(null);
    setIncomeName("");
    setIncomeAmount("");
    setIncomeDescription("");
    setIncomeCategory("");
  };

  const handleDeleteIncome = async (id) => {
    await deleteIncome(id);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Name..."
            value={incomeName}
            onChange={(e) => setIncomeName(e.target.value)}
            className="mr-4 px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
          />
          <input
            type="number"
            placeholder="Amount..."
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
            className="mr-4 px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
          />
          <input
            type="text"
            placeholder="Description..."
            value={incomeDescription}
            onChange={(e) => setIncomeDescription(e.target.value)}
            className="mr-4 px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
          />
          <select
            value={incomeCategory}
            onChange={(e) => setIncomeCategory(e.target.value)}
            className="mr-4 px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
          >
            {incomeCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            onClick={selectedIncomeId ? handleEditIncome : handleAddIncome}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {selectedIncomeId ? "Edit" : "Add"}
          </button>
        </div>
      </div>
      <div>
        {incomeData.map((income) => (
          <div
            key={income.id}
            className="flex items-center justify-between py-3 border-b"
          >
            <p>{`Name: ${income.name}, Amount: ${income.amount}, Description: ${income.description}, Category: ${income.category}`}</p>

            <div>
              <button
                onClick={() => {
                  setSelectedIncomeId(income.id);
                  setIncomeName(income.name);
                  setIncomeAmount(income.amount);
                  setIncomeDescription(income.description);
                  setIncomeCategory(income.category);
                }}
                className="mr-4 px-3 py-1 bg-yellow-500 text-white rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteIncome(income.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
