import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const Logout = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedImage = localStorage.getItem('profileImage');
    if (storedEmail) setEmail(storedEmail);
    if (storedImage) setPreview(storedImage);
  }, []);

  const handleLogout = () => {
    // No localStorage clearing, just navigate
    navigate("/");
  };

  const containerStyle = {
    maxWidth: "400px",
    minHeight: '350px',
    margin: "50px auto",
    padding: "40px 30px 30px 30px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "14px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
    background: '#f9f9f9',
  };

  const buttonStyle = {
    padding: "10px 28px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "17px",
    marginTop: '18px',
    fontWeight: 600,
    letterSpacing: 1,
    boxShadow: '0 2px 8px rgba(244,67,54,0.08)'
  };

  return (
    <div style={containerStyle}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>My Account</Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
        {preview ? (
          <Avatar src={preview} alt="Profile" sx={{ width: 80, height: 80, mb: 1 }} />
        ) : (
          <AccountCircle sx={{ fontSize: 80, color: '#aaa', mb: 1 }} />
        )}
        <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{email || "Not logged in"}</Typography>
      </div>
      <Typography variant="body1" sx={{ mb: 2, color: '#444' }}>You are currently logged in.</Typography>
      <button style={buttonStyle} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;

