import { Balance } from "@mui/icons-material";
import React, { useState } from "react";

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: "",
    Paymentmethod:"",
    note: "",
  });
  // const [remainingBalance, setRemainingBalance] = useState(0);
 // const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.amount || !formData.date || !formData.Paymentmethod) {
      alert("Please fill in all required fields!");
      return;
    }

    const amount = parseFloat(formData.amount);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const remainingBalance = totalIncome - totalExpense;

  if (formData.type === "expense" && amount > remainingBalance) {
    alert("Insufficient balance!");
    return;
  }
    const newTransaction = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
    };

    const existing = JSON.parse(localStorage.getItem("transactions")) || [];
    existing.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(existing));

    alert("Transaction added!");

    // Reset form
    setFormData({
      type: "expense",
      category: "",
      amount: "",
      date: "",
      Paymentmethod:"",
      note: "",
    });
  };

  const formStyle = {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  };

  const labelStyle = {
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      {/* Type */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Type</label>
        <select
          name="type"
          style={selectStyle}
          value={formData.type}
          onChange={handleChange}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Category */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Category</label>
        <input
          type="text"
          name="category"
          style={inputStyle}
          value={formData.category}
          placeholder="e.g., Food, Salary"
          onChange={handleChange}
          required
        />
      </div>

      {/* Amount */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Amount</label>
        <input
          type="number"
          name="amount"
          style={inputStyle}
          value={formData.amount}
          placeholder="Enter amount"
          onChange={handleChange}
          required
        />
      </div>

      {/* Date */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Date</label>
        <input
          type="date"
          name="date"
          style={inputStyle}
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
       <div style={fieldStyle}>
        <label style={labelStyle}>Payment method</label>
        <select
          name="Paymentmethod"
          style={selectStyle}
          value={formData.Paymentmethod}
          onChange={handleChange}
          required
        >
            <option value=''>--select--</option>
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Cash">Cash</option>
          <option value="DebitCard">Debit Card</option>
        </select>
      </div>


      {/* Note */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Note (Optional)</label>
        <textarea
          name="note"
          style={inputStyle}
          value={formData.note}
          placeholder="Add a note"
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <button type="submit" style={buttonStyle}>
        Add Transaction
      </button>
    </form>
  );
};

export default ExpenseForm;
