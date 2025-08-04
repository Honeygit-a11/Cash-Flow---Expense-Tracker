import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(stored);

    const totalIncome = stored.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0);
    const totalExpense = stored.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);

    setIncome(totalIncome);
    setExpense(totalExpense);
  }, []);

  const COLORS = ["#00C49F", "#FF8042", "#FF6384", "#36A2EB", "#FFCE56", "#21c761ff", "#e63e3eff", "#8b6df7ff"];
  const categoryTotals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  const balance = income - expense;
  const recentTransactions = transactions.slice(-7).reverse();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        padding: "20px",
      }}
    >
      {/* Main Dashboard */}
      <div style={{ flex: 1, padding: "20px", width: "100%" }}>
        {/* Top Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" }}>
          <h1>Dashboard</h1>
          <div>
            <span style={{ fontSize: "20px", fontWeight: "bold", color: "green", marginRight: "15px" }}>
              Balance: ₹{balance}
            </span>
          </div>
        </div>

        {/* Cards Row */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <div style={cardStyle}>
            <h3>Monthly Budget</h3>
            <p style={{ color: "green", fontSize: "24px" }}>₹{income}</p>
          </div>
          <div style={cardStyle}>
            <h3>Total Spent</h3>
            <p style={{ color: "red", fontSize: "24px" }}>₹{expense}</p>
          </div>
          <div style={cardStyle}>
            <h3>Remaining</h3>
            <p style={{ color: "blue", fontSize: "24px" }}>₹{balance}</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ display: "flex", gap: "20px" }}>
          {/* Pie Chart */}
          <div style={sectionStyle}>
            <h3>Spending by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Transactions */}
          <div style={sectionStyle}>
            <h3>Recent Transactions</h3>
            {recentTransactions.length > 0 ? (
              recentTransactions.map((t) => (
                <div
                  key={t.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid #ddd",
                    color: t.type === "expense" ? "red" : "green",
                  }}
                >
                  <span>{t.category} ({t.date})</span>
                  <span>{t.type === "expense" ? "-" : "+"}₹{t.amount}</span>
                </div>
              ))
            ) : (
              <p>No recent transactions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

const sectionStyle = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

export default Dashboard;
