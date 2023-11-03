"use client";

import React from "react";
//import Expense from "../../../lib/expense";
import IncomePage from "../../../lib/income";
import Layout from "../components/Layout";

const FinancePage = () => {
  return (
    <Layout>
      <div>
        <h1>Finance Page</h1>
        <div>
          <IncomePage />
        </div>
      </div>
    </Layout>
  );
};

export default FinancePage;
