import React, { useEffect, useState } from 'react';
import { Avatar, Button, Typography, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedImage = localStorage.getItem('profileImage');

    if (storedEmail) setEmail(storedEmail);
    if (storedImage) setPreview(storedImage);
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
        alert('Profile picture updated!');
      };
      reader.readAsDataURL(image);
    } else {
      alert('Please select an image first.');
    }
  };

  return (
    <Box
      sx={{
        width: 350,
        margin: '50px auto',
        padding: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        textAlign: 'center',
        backgroundColor: '#f7f7f7',
      }}
    >
      <Typography variant="h5" gutterBottom>User Profile</Typography>

      {preview ? (
        <Avatar
          src={preview}
          alt="Profile"
          sx={{ width: 100, height: 100, margin: '0 auto 10px' }}
        />
      ) : (
        <AccountCircle sx={{ fontSize: 100, color: '#aaa', marginBottom: 1 }} />
      )}

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <Box mt={3} textAlign="left">
        <Typography><strong>Email:</strong> {email || "Not logged in"}</Typography>
      </Box>
    </Box>
  );
};

export default Profile;
