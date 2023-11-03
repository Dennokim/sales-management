import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { ArcElement, Chart } from "chart.js";
import IncomeForm from "@/app/components/incomeForm";

Chart.register(ArcElement);

import {
  addIncome,
  editIncome,
  deleteIncome,
  getAllIncomes,
} from "../firebase/finance/income/income";
import { getIncomeCategory } from "../firebase/finance/category/category";

export default function IncomePage() {
  const [incomeData, setIncomeData] = useState([]);
  const [incomeName, setIncomeName] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeDescription, setIncomeDescription] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");
  const [selectedIncomeId, setSelectedIncomeId] = useState(null);
  const [showIncomeForm, setShowIncomeForm] = useState(false);

  const [incomeCategories, setIncomeCategories] = useState([]);

  const svgRef = useRef();

  const drawPieChart = () => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const color = d3
      .scaleOrdinal()
      .domain(incomeCategories.map((category) => category.name))
      .range(d3.schemeSet2);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const data = d3
      .pie()
      .value((d) => d.amount)
      .sort(null)(incomeData);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius - 30);

    const arcLabel = d3
      .arc()
      .innerRadius(radius - 40)
      .outerRadius(radius - 40);

    const arcs = svg
      .selectAll("g.arc")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.category))
      .append("title")
      .text((d) => `${d.data.category}: ${d.data.amount}`);

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
      .attr("dy", "0.35em")
      .text((d) => d.data.category);
  };

  useEffect(() => {
    getAllIncomes(setIncomeData);
    getIncomeCategory(setIncomeCategories);
  }, []);

  useEffect(() => {
    drawPieChart();
  }, [incomeData]);

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
          <button onClick={() => setShowIncomeForm(true)}>Add Income</button>
          {showIncomeForm && (
            <IncomeForm
              onIncomeAdded={() => {
                setShowIncomeForm(false);
                getAllIncomes(setIncomeData);
              }}
            />
          )}
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
      {/* Render the SVG element for the pie chart */}
      <svg ref={svgRef} style={{ height: "400px", marginTop: "20px" }} />
    </div>
  );
}
