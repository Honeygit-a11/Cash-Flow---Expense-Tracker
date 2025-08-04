import React, { useState } from 'react';
import './Moneytransfer.css'; // Optional: Add CSS for styling

const Moneytransfer = () => {
  const [formData, setFormData] = useState({
    receiverName: '',
    accountNo: '',
    ifscCode: '',
    amount: ''
  });

  const [message, setMessage] = useState('');
  const [transactions, setTransactions] = useState([]); // <-- new state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { receiverName, accountNo, ifscCode, amount } = formData;

    if (!receiverName || !accountNo || !ifscCode || !amount) {
      setMessage('Please fill in all fields');
      return;
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{7}$/.test(ifscCode)) {
      setMessage('Invalid IFSC Code');
      return;
    }

  if (isNaN(accountNo) || accountNo.length < 9) {
      setMessage('Invalid Account Number');
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      setMessage('Enter a valid amount');
      return;
    }

    const newTransaction = {
      ...formData,
      date: new Date().toLocaleString()
    };

    setTransactions(prev => [newTransaction, ...prev]); // Add new transaction
    setMessage('Money sent successfully!');
    console.log('Transaction:', newTransaction);

    // Reset form
    setFormData({
      receiverName: '',
      accountNo: '',
      ifscCode: '',
      amount: ''
    });
  };

  return (
    <div className="money-transfer-form">
      <h2>Money Transfer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="receiverName"
          placeholder="Receiver Name"
          value={formData.receiverName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="accountNo"
          placeholder="Account Number"
          value={formData.accountNo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ifscCode"
          placeholder="IFSC Code"
          value={formData.ifscCode}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <button type="submit">Pay</button>
      </form>

      {message && <p className="message">{message}</p>}

      {transactions.length > 0 && (
        <div className="transaction-report">
          <h3>Transaction Report</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Receiver</th>
                <th>Account No</th>
                <th>IFSC</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index}>
                  <td>{txn.date}</td>
                  <td>{txn.receiverName}</td>
                  <td>{txn.accountNo}</td>
                  <td>{txn.ifscCode}</td>
                  <td>₹{txn.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Moneytransfer;
