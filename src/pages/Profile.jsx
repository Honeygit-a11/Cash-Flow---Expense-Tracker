import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedImage = localStorage.getItem('profileImage');

    if (storedEmail) {
      setEmail(storedEmail);
    }

    if (storedImage) {
      setPreview(storedImage);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('profileImage', reader.result);
        alert('Profile image updated successfully!');
      };
      reader.readAsDataURL(image);
    } else {
      alert('Please select an image first!');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Profile Page</h2>
      <p><strong>Email:</strong> {email || "No email found"}</p>

      <div style={styles.profilePicContainer}>
        {preview ? (
          <img src={preview} alt="Profile" style={styles.image} />
        ) : (
          <div style={styles.placeholder}>No Image</div>
        )}
      </div>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br />
      <button style={styles.button} onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '10px',
    background: '#f9f9f9'
  },
  heading: {
    marginBottom: '10px',
  },
  profilePicContainer: {
    margin: '10px 0',
  },
  image: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  placeholder: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: '#ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#777',
    margin: 'auto',
  },
  button: {
    marginTop: '10px',
    padding: '8px 16px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Profile;
