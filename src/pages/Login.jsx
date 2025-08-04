import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get stored credentials
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
      alert(`Login successfull,Welcome!`);
      localStorage.setItem("isLoggedIn", "true"); // Set login flag
      navigate("/main"); // Redirect after login
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    
    <div style={{
      minHeight: "100vh", display: "flex", justifyContent: "center",
      alignItems: "center", backgroundColor: "#f4f6f8"
    }}>
      {/* <video 
     src="/logo.mp4"
     autoPlay
     loop
     muted
     style={{height:'70px', marginLeft:'30px', borderRadius:'50px'}}
/> */}
      <Card style={{
        width: "400px", padding: "20px", borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <h3 style={{ color: "#00b894", textAlign: "center", marginBottom: "20px" }}>Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit" style={{
            width: "100%", backgroundColor: "#00b894", border: "none",
            padding: "10px", fontWeight: "bold"
          }}>
            Login
          </Button>
        </Form>
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#00b894", fontWeight: "bold" }}>Signup</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
