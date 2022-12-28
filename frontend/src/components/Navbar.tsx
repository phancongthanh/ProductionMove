import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { FaBars } from "react-icons/fa";
import { useProSidebar } from "react-pro-sidebar";
import { alpha, Avatar, Divider, InputBase, ListItemIcon, Menu, MenuItem, styled, Tooltip } from "@mui/material";
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import logOut from "../actions/user/logOut";



const Navbar = () => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate()
  const {setAuth} = useAuth()

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { toggleSidebar } = useProSidebar();

  const logout = () => {
    setAuth(null)
    navigate('/login', {replace : true})
    logOut()
  }

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="btn-toggle" onClick={() => toggleSidebar(true)}>
          <FaBars />
        </div>
        <div className="items">
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
