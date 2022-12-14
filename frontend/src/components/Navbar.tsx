import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { FaBars } from "react-icons/fa";
import { useProSidebar } from "react-pro-sidebar";
import { alpha, Avatar, InputBase, styled } from "@mui/material";
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



const Navbar = () => {
  const { toggleSidebar } = useProSidebar();

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="btn-toggle" onClick={() => toggleSidebar(true)}>
          <FaBars />
        </div>
        <div className="items">
        <IconButton>
            <Avatar/>
        </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
