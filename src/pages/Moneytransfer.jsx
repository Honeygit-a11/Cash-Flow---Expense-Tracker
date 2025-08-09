import React, { useEffect, useState } from 'react';
import './Moneytransfer.css';
import { toast } from 'react-toastify';


const Moneytransfer = () => {
  const [formData, setFormData] = useState({
    receiverName: '',
    accountNo: '',
    ifscCode: '',
    amount: ''
  });

  const [message, setMessage] = useState('');
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

  const balance = income - expense;


  // Load transactions from localStorage
  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;
    const { receiverName, accountNo, ifscCode, amount } = formData;

    // Validation
    if (!receiverName || !accountNo || !ifscCode || !amount) {
      toast.warning('Please fill in all fields');
      return;
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      toast.error('Invalid IFSC Code');
      return;
    }

    if (isNaN(accountNo) || accountNo.length < 9) {
      toast.error('Invalid Account Number');
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      toast.error('Enter a valid amount');
      return;
    }

    const enterAmount = Number(amount);
    if (enterAmount > balance) {
      toast.error('Insufficient Balance');
      return;
    }
    const newTransaction = {
      receiverName,
      accountNo,
      ifscCode,
      category: 'Transfer',
      Paymentmethod: 'Bank To Bank',
      amount: Number(amount),
      date: new Date().toLocaleString(),
      type: 'expense'
    };
    // update balance

    const newBalance = balance - enterAmount;
    localStorage.setItem('userBalance', newBalance.toString());

    // Update state and localStorage
    setTransactions(prev => {
      const updated = [newTransaction, ...prev];
      localStorage.setItem('transactions', JSON.stringify(updated));
      return updated;
    });

    toast.success('Money sent successfully!');

    // Reset form
    setFormData({
      receiverName: '',
      accountNo: '',
      ifscCode: '',
      amount: ''
    });
  };

  const handleDelete = (indexToDelete) => {
    const updatedTransactions = transactions.filter((_, index) => index !== indexToDelete);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    toast.info('Transaction deleted')
  }

  return (
    <>
      <div className="money-transfer-form">
        <div>
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
        </div>

        {transactions.filter(txn => txn.category === 'Transfer').length > 0 && (
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
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {transactions.filter(txn => txn.category === 'Transfer').map((txn, index) => (
                  <tr key={index}>
                    <td>{txn.date}</td>
                    <td>{txn.receiverName}</td>
                    <td>{txn.accountNo}</td>
                    <td>{txn.ifscCode}</td>
                    <td>₹{txn.amount}</td>
                    <td>
                      <button className='delete-btn' onClick={() => handleDelete(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Moneytransfer;
