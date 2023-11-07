import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { getAllIncomes } from "../firebase/finance/income/income";
import { getIncomeCategory } from "../firebase/finance/category/category";
import IncomeForm from "@/app/components/form/incomeForm";

import { ArcElement, Chart } from "chart.js";

Chart.register(ArcElement);
const Finance = () => {
  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chartData, setChartData] = useState({});
  const [showForm, setShowForm] = useState(false);

  const refreshData = () => {
    getAllIncomes((incomes, categoryTotals) => {
      setIncomes(incomes);

      const sortedCategories = Object.keys(categoryTotals).sort(
        (a, b) => categoryTotals[b] - categoryTotals[a]
      );

      const labels = sortedCategories;
      const data = labels.map((label) => categoryTotals[label]);
      const totalIncome = data.reduce((a, b) => a + b, 0);
      const percentages = data.map((value) =>
        ((value / totalIncome) * 100).toFixed(2)
      );

      // Generate colors dynamically
      const colors = labels.map(
        () => "#" + Math.floor(Math.random() * 16777215).toString(16)
      );

      setChartData({
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors,
          },
        ],
        percentages,
        totalIncome,
      });
    });
  };

  useEffect(() => {
    refreshData();
    getIncomeCategory(setCategories);
  }, []);

  return (
    <div className="flex justify-between">
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Income Overview</h2>
        <h3 className="text-xl mb-2">Total Income: {chartData.totalIncome}</h3>
        {chartData.labels && chartData.datasets && chartData.datasets[0] && (
          <Doughnut data={chartData} />
        )}
        {chartData.labels &&
          chartData.datasets &&
          chartData.datasets[0] &&
          chartData.percentages &&
          chartData.labels.map((label, i) => (
            <div key={i} className="flex items-center mt-2">
              <span
                style={{
                  backgroundColor: chartData.datasets[0].backgroundColor[i],
                }}
                className="w-4 h-4 mr-2 rounded-full"
              ></span>
              {label}: {chartData.datasets[0].data[i]} (
              {chartData.percentages[i]}%)
            </div>
          ))}
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">All Incomes</h2>
        {chartData.labels &&
          chartData.labels.map((category, i) => (
            <div key={i} className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              {incomes
                .filter((income) => income.category === category)
                .map((income) => (
                  <div key={income.id} className="border p-2 mb-2">
                    <h4 className="font-semibold">{income.name}</h4>
                    <p>{income.description}</p>
                    <p>{income.amount}</p>
                    {/* Add your edit and delete buttons here */}
                  </div>
                ))}
            </div>
          ))}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showForm ? "Hide" : "Add Income"}
        </button>
        {showForm && <IncomeForm onIncomeAdded={refreshData} />}
      </div>
    </div>
  );
};

export default Finance;
