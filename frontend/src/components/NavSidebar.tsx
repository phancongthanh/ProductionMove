import React, { ReactNode, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

import { Link, useLocation  } from "react-router-dom";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaShoppingBag , FaUser} from "react-icons/fa";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import BusinessIcon from '@mui/icons-material/Business';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import useAuth from "../hooks/useAuth";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';



const NavSidebar = ({children} : {children:ReactNode}) => {


  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

    const auth = useAuth();


  return (
    <div style={{ display: 'flex', height: '100vh', position: 'sticky'}}>
    <Sidebar breakPoint="md">
      <Menu>
        {collapsed ? (
          <MenuItem
            icon={<FaAngleDoubleRight />}
            onClick={() => collapseSidebar()}
          ></MenuItem>
        ) : (
          <MenuItem
            suffix={<FaAngleDoubleLeft />}
            onClick={() => collapseSidebar()}
          >
            <div
              style={{
                padding: "9px",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 15,
                letterSpacing: "1px",
              }}
            >
              Production Move
            </div>
          </MenuItem>
        )}
      </Menu>
      <Box sx={{display: 'flex', flexDirection: 'column', margin: 1, padding: 2, backgroundColor:'blueviolet', color:'lightgrey', borderRadius: 5}}>
        {!collapsed ? <>
          <Typography fontSize="small">Xin chào,</Typography>
          <Typography fontSize={30} sx={{alignSelf: 'center'}}>{auth.auth?.user.name}</Typography>
          <Typography>Vai Trò: {auth.auth?.user.role}</Typography>
          </>
        : null
        }

      </Box>
      <Menu>
          {children}
      </Menu>
    </Sidebar>
    </div>
  );
};

NavSidebar.propTypes = {};

export default NavSidebar;
