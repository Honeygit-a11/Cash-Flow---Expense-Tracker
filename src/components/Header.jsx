import React from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const headerStyle = {
    backgroundColor: "#333",
    color: "white",
    padding: "10px",
    textAlign: "left",
    fontSize: "24px",
    display: 'flex',
    letterSpacing: "1px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: '100%',
    boxSizing: 'border-box',
  };

  const NavStyle = {
    padding: '0 15px',
    justifyContent: "space-around",
    alignItems: "center",
    color: "white",
    fontSize: "14px",
    textDecoration: 'none',
  };

  return (
    <header style={headerStyle}>
     
      Expense Tracker
      <Box style={{ flex: 1, textAlign: 'right' }}>

        <Link
          to="/main/dashboard"
          style={NavStyle}
          onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          Dashboard
        </Link>
        <Link
          to="/main/add-transaction"
          style={NavStyle}
          onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          Add Expense
        </Link>
        <Link
          to="/main/reports"
          style={NavStyle}
          onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          Reports
        </Link>



       <div onClick={handleMenu} style={{ display: 'inline-block', cursor: 'pointer', paddingLeft: '10px' }}>
  <AccountCircle />
</div>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>

      </Box>
    </header>

  );
};

export default Header;
