import React, { useState } from 'react';
import { Button, Card, Form, ToastHeader } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/login.css';
import { toast } from 'react-toastify';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser?.email === email && storedUser?.password === password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      toast.success('Login Successfull')
      navigate('/main');
    } else {
    toast.error("login failed,Please Signup!");
    }
  };

  return (
    <div className="auth-wrapper">
      <Card className="auth-card">
        <h3 className="auth-title">Login</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="auth-button">
            Login
          </Button>
        </Form>

        <p><h6>
          Don’t have an account?{' '}
          <Link to="/signup" >Signup</Link></h6>
        </p>
      </Card>
    </div>
  );
};

export default Login;
