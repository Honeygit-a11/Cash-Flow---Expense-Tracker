import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Store user credentials in localStorage
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("Account created successfully!");
    navigate("/"); // Redirect to login page
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", justifyContent: "center",
      alignItems: "center", backgroundColor: "#f4f6f8"
    }}>
      <Card style={{
        width: "400px", padding: "20px", borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <h3 style={{ color: "#00b894", textAlign: "center", marginBottom: "20px" }}>Signup</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit" style={{
            width: "100%", backgroundColor: "#00b894", border: "none",
            padding: "10px", fontWeight: "bold"
          }}>
            Signup
          </Button>
        </Form>
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#00b894", fontWeight: "bold" }}>Login</Link>
        </p>
      </Card>
    </div>
  );
}

export default Signup;
