import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/login.css';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warn("Passwords do not match!");
      return;
    }

    const newUser = { email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    toast.success('Signup success');
    navigate('/login');
  };

  return (
    <div className="auth-wrapper">
      <Card className="auth-card">
        <h3 className="auth-title">Signup</h3>
        <Form onSubmit={handleSubmit}>
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

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className="auth-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="auth-button">
            Signup
          </Button>
        </Form>

        <p><h6>
          Already have an account?{' '}
          <Link to="/login">Login</Link></h6>
        </p>
       
      </Card>
    </div>
  );
};

export default Signup;
