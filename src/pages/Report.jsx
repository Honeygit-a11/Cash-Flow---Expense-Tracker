import React, { useEffect, useState } from "react";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all"); // all, income, expense

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  const filteredTransactions =
    filter === "all" ? transactions : transactions.filter((t) => t.type === filter);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const containerStyle = {
    maxWidth: "900px",
    margin: "30px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  const summaryStyle = {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  };

  const selectStyle = {
    padding: "8px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    cursor: "pointer",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thTdStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h2>Expense Report</h2>

      {/* Summary */}
      <div style={summaryStyle}>
        <div>Income: ₹{totalIncome}</div>
        <div>Total Expense: ₹{totalExpense}</div>
        <div>Balance: ₹{balance}</div>
      </div>

      {/* Filter */}
      <div>
        <select
          style={selectStyle}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Transactions</option>
          <option value="income">Only Income</option>
          <option value="expense">Only Expenses</option>
        </select>
      </div>

      {/* Transactions Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Date</th>
            <th style={thTdStyle}>Type</th>
            <th style={thTdStyle}>Category</th>
            <th style={thTdStyle}>Amount (₹)</th>
            <th style={thTdStyle}>Paymentmethod</th>
            <th style={thTdStyle}>Note</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t) => (
              <tr key={t.id}>
                <td style={thTdStyle}>{t.date}</td>
                <td style={thTdStyle}>{t.type}</td>
                <td style={thTdStyle}>{t.category}</td>
                <td style={thTdStyle}>{t.amount}</td>
                <td style={thTdStyle}>{t.Paymentmethod}</td>
                <td style={thTdStyle}>{t.note || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={thTdStyle}>
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
