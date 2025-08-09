import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import './Dashboard.css';

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

  const chartData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));

  const balance = income - expense;
  const recentTransactions = transactions.slice(-7).reverse();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <span className="dashboard-balance">Balance: ₹{Math.ceil(balance)}</span>
      </div>

      <div className="cards-container">
        <div className="card card-income">
          <h3>Total Income</h3>
          <p>₹{income}</p>
        </div>
        <div className="card card-expense">
          <h3>Total Expense</h3>
          <p>₹{Math.ceil(expense)}</p>
        </div>
        <div className="card card-balance">
          <h3>Balance</h3>
          <p>₹{Math.ceil(balance)}</p>
        </div>
      </div>

      <div className="section-container">
        <div className="section">
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

        <div className="section">
          <h3>Recent Transactions</h3>
          {recentTransactions.length > 0 ? (
            recentTransactions.map((t) => (
              <div
                key={t.id}
                className={`transaction-item ${t.type === 'expense' ? 'transaction-expense' : 'transaction-income'}`}
              >
                <span>{t.category} ({t.date})</span>
                <span>{t.type === 'expense' ? '-' : '+'}₹{t.amount}</span>
              </div>
            ))
          ) : (
            <p>No recent transactions.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
