import React, { useEffect, useState } from 'react';
import { Avatar, Button, Typography, Box, TextField, Stack } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { toast } from 'react-toastify';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedImage = localStorage.getItem('profileImage');
    const storedName = localStorage.getItem('displayName');
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    if (storedEmail) setEmail(storedEmail);
    if (storedImage) setPreview(storedImage);
    if (storedName) setDisplayName(storedName);
    setTransactions(storedTransactions);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const objectURL = URL.createObjectURL(file);
      setPreview(objectURL); // Set live preview
    }
  };

  const handleSubmit = () => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('profileImage', reader.result);
        setPreview(reader.result); // Update preview with saved base64
        toast.success('Profile picture updated!');
      };
      reader.readAsDataURL(image);
    } else {
      toast.info('Please select an image first.');
    }
  };

  const handleRemovePhoto = () => {
    localStorage.removeItem('profileImage');
    setPreview(null);
    setImage(null);
  };

  const handleNameChange = (e) => {
    setDisplayName(e.target.value);
    localStorage.setItem('displayName', e.target.value);
  };

  // Calculate summary
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((a, b) => a + (b.amount || 0), 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + (b.amount || 0), 0);
  const balance = totalIncome - totalExpense;

  return (
    <Box
      sx={{
        width: 400,
        margin: '50px auto',
        padding: 4,
        border: '1px solid #ccc',
        borderRadius: 3,
        textAlign: 'center',
        backgroundColor: '#f7f7f7',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}
    >
      <Typography variant="h5" gutterBottom>User Profile</Typography>

      <Stack direction="column" alignItems="center" spacing={1}>
        {preview ? (
          <Avatar src={preview} alt="Profile" sx={{ width: 100, height: 100, mb: 1 }} />
        ) : (
          <Avatar sx={{ width: 100, height: 100, mb: 1, bgcolor: '#bdbdbd', fontSize: 40 }}>
            {displayName ? displayName[0].toUpperCase() : <AccountCircle sx={{ fontSize: 100, color: '#aaa' }} />}
          </Avatar>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: 8 }} />
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={handleSubmit}>Upload Photo</Button>
          {preview && <Button variant="outlined" color="error" onClick={handleRemovePhoto}>Remove Photo</Button>}
        </Stack>
      </Stack>

      <TextField
        label="Display Name"
        value={displayName}
        onChange={handleNameChange}
        fullWidth
        sx={{ mt: 3, mb: 1 }}
      />
      <Typography variant="body1" sx={{ mb: 2 }}><strong>Email:</strong> {email || "Not logged in"}</Typography>

      <Box mt={2} mb={1} sx={{ background: '#e3f2fd', borderRadius: 2, p: 2 }}>
        <Typography variant="subtitle1" color="primary"><strong>Summary</strong></Typography>
        <Typography variant="body2">Total Income: <strong style={{color:'#388e3c'}}>₹{totalIncome}</strong></Typography>
        <Typography variant="body2">Total Expense: <strong style={{color:'#d32f2f'}}>₹{totalExpense}</strong></Typography>
        <Typography variant="body2">Balance: <strong style={{color:'#1976d2'}}>₹{balance}</strong></Typography>
      </Box>
    </Box>
  );
};

export default Profile;
