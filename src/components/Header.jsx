import React from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import './Header.css';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <header className="header">
        <Box className="nav-container">
          <img src="/logo.png" alt="logo" className="logo" />

          <Box className="nav-section">
            <Link to="/main/dashboard" className="hon-link">Dashboard</Link>
            <Link to="/main/add-transaction" className="hon-link">Add Expense</Link>
            <Link to="/main/reports" className="hon-link">Reports</Link>
            <Link to="/main/Moneytransfer" className="hon-link">Money Transfer</Link>
            <Link to="/main/loan" className="hon-link">Loan Manager</Link>
          </Box>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            className="account-icon"
          >
            <AccountCircle fontSize="inherit" />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/main/profile" className="menu-link">Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/main/Logout" className="menu-link">My Account</Link>
            </MenuItem>
          </Menu>
        </Box>
      </header>
    </>
  );
};

export default Header;
