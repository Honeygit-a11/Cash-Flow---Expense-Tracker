import React from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, IconButton } from "@mui/material";
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
    fontSize: "16px",
    textDecoration: 'none',
    marginRight:'50px',
  };

  return (
  <>
  
    <header style={headerStyle}>
      <Box 
      style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    }}>

     <video 
     src="/logo.mp4"
     autoPlay
     loop
     muted
     style={{height:'70px', marginLeft:'30px', borderRadius:'50px'}}
/>
    <Box style={{ display: "flex", alignItems: "center", gap: "20px", marginLeft: "20px" }}>


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
</Box>



  
   <IconButton
      size="large"
      edge="end"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleMenu}
      color="inherit"
      sx={{fontSize:'50px'}}
    >
      <AccountCircle fontSize="inherit" />
    </IconButton>


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
                <MenuItem onClick={handleClose}> <Link to="/main/profile" style={{ textDecoration: "none", color: "inherit" }}>Profile</Link></MenuItem>
                <MenuItem onClick={handleClose}> <Link to="/main/Logout" style={{textDecoration: "none", color: "inherit" }}>My account</Link></MenuItem>
              </Menu>
</Box>
   </header>
</>
  );
};

export default Header;
