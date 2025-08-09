import React, { useState, useEffect } from "react";
import "./Loan.css";
import { Button, Form, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const Loan = () => {
  const [loans, setLoans] = useState([]);
  const [formData, setFormData] = useState({
    Type: "",
    amount: "",
    interest: "",
    term: "",
    emi: "",
    startday: "",
    endday: "",
  });
  // Load from localStorage
  useEffect(() => {
    const storedLoans = JSON.parse(localStorage.getItem("loans")) || [];
    setLoans(storedLoans);
    setInitialized(true);
  }, []);

  const calculateEMI = (amount, interest, term) => {
    const P = parseFloat(amount);
    const R = parseFloat(interest) / (12 * 100);
    const N = parseFloat(term);

    if (!P || !R || !N) return "";
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    return emi.toFixed(2);
  };

  const [initialized, setInitialized] = useState(false);

  // Save to localStorage
  useEffect(() => {
    if (initialized) {
      localStorage.setItem("loans", JSON.stringify(loans));
    }
  }, [loans, initialized]);

  //calculate end date
  const calculateEndDate = (startDateStr, termMonths) => {
    if (!startDateStr || !termMonths) return "";

    const startDate = new Date(startDateStr);
    if (isNaN(startDate)) return "";

    const endDate = new Date(
      startDate.setMonth(startDate.getMonth() + parseInt(termMonths))
    );
    return endDate.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = {
      ...formData,
      [name]: value,
    };

    //auto-calculate Emi
    if (updatedForm.amount && updatedForm.interest && updatedForm.term) {
      updatedForm.emi = calculateEMI(
        updatedForm.amount,
        updatedForm.interest,
        updatedForm.term
      );
    }

    //auto calculate enddate
    if (updatedForm.startday && updatedForm.term) {
      updatedForm.endday = calculateEndDate(
        updatedForm.startday,
        updatedForm.term
      );
    }
    setFormData(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { Type, amount, interest, term, emi, startday } = formData;
    if (!Type || !amount || !interest || !term || !emi || !startday) {
      toast.warn("Please fill out all fields!");
      return;
    }

    const newLoan = {
      id: Date.now(),
      ...formData,
    };

    setLoans((prev) => [...prev, newLoan]);
    setFormData({
      Type: "",
      amount: "",
      interest: "",
      term: "",
      emi: "",
      startday: "",
      endday: "",
    });
    toast.success("Loan added successfully!");

    // add loan as a transction in transactions list

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    const LoanAsTransaction = {
      id: Date.now(),
      category: `${formData.Type} loan`,
      amount: Number(formData.amount),
      date: formData.startday,
      type: "income",
      Paymentmethod: "Bank To Bank",
      note: "Loan",
    };

    transactions.push(LoanAsTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    setFormData({
      Type: "",
      amount: "",
      interest: "",
      term: "",
      emi: "",
      startday: "",
      endday: "",
    });
  };

  const handlePayEmi = (loanId) => {
    const updatedLoans = [...loans];
    const loanIndex = updatedLoans.findIndex((loan) => loan.id === loanId);
    if (loanIndex === -1) return;
    const selectedLoan = updatedLoans[loanIndex];
    const emiAmount = parseFloat(selectedLoan.emi);

    //check if emi paid already paid this month
    const today = new Date();
    const lastEmiPaid = selectedLoan.lastEmiPaid
      ? new Date(selectedLoan.lastEmiPaid)
      : null;
    const emiPaidThisMonth =
      lastEmiPaid &&
      lastEmiPaid.getMonth() === today.getMonth() &&
      lastEmiPaid.getFullYear() === today.getFullYear();
    if (emiPaidThisMonth) {
      toast.info("EMI already paid for this month");
      return;
    }
    // Calculate current balance
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const balance = totalIncome - totalExpense;

    if (balance >= emiAmount) {
      // Add EMI as an expense transaction
      const emiTransaction = {
        id: Date.now(),
        category: `${selectedLoan.Type} loan EMI`,
        amount: emiAmount,
        date: new Date().toISOString().split("T")[0],
        type: "expense",
        Paymentmethod: "Bank To Bank",
        note: "EMI Payment",
      };
      transactions.push(emiTransaction);
      localStorage.setItem("transactions", JSON.stringify(transactions));

      // Reduce the loan term
      selectedLoan.term = Math.max(0, parseInt(selectedLoan.term) - 1);
       selectedLoan.lastEmiPaid = new Date().toISOString().split("T")[0];
      if (selectedLoan.term === 0) {
        updatedLoans.splice(loanIndex, 1);
        toast.success("Loan fully paid!");
      } else {
        updatedLoans[loanIndex] = selectedLoan;
        toast.success("EMI paid successfully!");
      }
      setLoans(updatedLoans);
    } else {
      toast.info("Insufficient balance. Cannot process EMI");
    }
  };

  return (
    <div>
      <div className="loan-container">
        <h2 className="loan-heading">Loan Manager</h2>

        <Form onSubmit={handleSubmit} className="loan-form">
          <div className="row-group">
            <Form.Group className="form-group">
              <Form.Label>Loan Type (e.g Car Loan)</Form.Label>
              <Form.Control
                type="text"
                name="Type"
                value={formData.Type}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Loan Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </Form.Group>
          </div>

          <div className="row-group">
            <Form.Group className="form-group">
              <Form.Label>Interest Rate (%)</Form.Label>
              <Form.Control
                type="number"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                placeholder="e.g. 8.5"
              />
            </Form.Group>

            <Form.Group controlId="term" className="form-group">
              <Form.Label>Loan Term (months)</Form.Label>
              <Form.Control
                type="number"
                name="term"
                value={formData.term}
                onChange={handleChange}
                placeholder="e.g. 12"
              />
            </Form.Group>
          </div>

          <div className="row-group">
            <Form.Group className="form-group">
              <Form.Label>EMI</Form.Label>
              <Form.Control
                type="number"
                // placeholder="Auto-calculate EMI"
                name="emi"
                value={formData.emi || ""}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="startday" className="form-group">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startday"
                value={formData.startday}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                max={(() => {
                  const d = new Date();
                  d.setDate(d.getDate() + 30);
                  return d.toISOString().split("T")[0];
                })()}
              />
            </Form.Group>
          </div>

          <div className="row-group">
            <Form.Group className="form-group">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endday"
                value={formData.endday}
                readOnly
                disabled
              />
            </Form.Group>
          </div>

          <Button type="submit" variant="success" className="w-100">
            Add Loan
          </Button>
        </Form>
      </div>
      <div className="loan-record">
        <h4 className="mt-4">Loan Records</h4>

        {loans.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Interest (%)</th>
                <th>Term (Months)</th>
                <th>EMI</th>
                <th>Start On</th>
                <th>End On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => {
                const today = new Date();
                const lastEmiPaid = loan.lastEmiPaid
                  ? new Date(loan.lastEmiPaid)
                  : null;
                const emiPaidThisMonth =
                  lastEmiPaid &&
                  lastEmiPaid.getMonth() === today.getMonth() &&
                  lastEmiPaid.getFullYear() === today.getFullYear();
                return (
                  <tr key={loan.id}>
                    <td>{loan.Type}</td>
                    <td>₹ {loan.amount}</td>
                    <td>{loan.interest}%</td>
                    <td>{loan.term}</td>
                    <th>{loan.emi}</th>
                    <th>{loan.startday}</th>
                    <th>{loan.endday}</th>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handlePayEmi(loan.id)}
                        disabled={emiPaidThisMonth}
                      >
                        Pay EMI
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted">No loan records found.</p>
        )}
      </div>
    </div>
  );
};

export default Loan;
