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



const NavSidebar = ({children} : {children:ReactNode}) => {


  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

    let pathname = useLocation().pathname;

  return (
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
      <Menu>
          {children}
      </Menu>
    </Sidebar>
  );
};

NavSidebar.propTypes = {};

export default NavSidebar;
