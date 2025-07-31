import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user data (if stored)
    localStorage.removeItem("user"); // optional: remove token/email/etc.
    localStorage.removeItem("transactions"); // if needed

    // Navigate to login page
    navigate("/");
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={containerStyle}>
      <h2>My Account</h2>
      <p>You are logged in.</p>
      <button style={buttonStyle} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;

