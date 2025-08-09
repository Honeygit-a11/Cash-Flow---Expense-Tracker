import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import AutoTable from "jspdf-autotable";

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

  const totalExpense = Math.ceil(transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0));

  const balance = Math.ceil(totalIncome - totalExpense);

  const generatePDF = ()=>{
    const doc = new jsPDF();
   doc.text('Expense Report'  ,80,15);
    doc.setFontSize(16);
<br/>
    doc.setFontSize(12);
    doc.text(`Total Income: ${totalIncome}`,14,15);
    doc.text(`Total Expense: ${totalExpense}`,14,32);
    doc.text(`Balance : ${balance}`,14,39);
    
    //prepare table
    const tableData = filteredTransactions.map((t)=>[
      t.date,
      t.type,
      t.category,
      t.amount,
      t.Paymentmethod,
      t.note|| '-',
    ]);
     AutoTable(doc,{
      head: [["Date", "Type", "Category", "Amount", "Payment", "Note"]],
      body: tableData,
      startY: 20,
    });

    doc.save("expense_report.pdf");
  }

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
  const button={
     marginBottom: "15px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
  }

  return (
    <div style={containerStyle}>
      <h2>Expense Report</h2>

      {/* Summary */}
      <div style={summaryStyle}>
        <div>Income: ₹{totalIncome}</div>
        <div>Total Expense: ₹{totalExpense}</div>
        <div>Balance: ₹{balance}</div>
      </div>
      <button style={button} onClick={generatePDF}>
        Download PDF
      </button>

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
