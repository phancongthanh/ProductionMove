import React, { useEffect, useState } from "react";
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
import NavSidebar from "../../../components/NavSidebar";

const FacSidebar = () => {
    let pathname = useLocation().pathname;

  return (
    <NavSidebar>
        <MenuItem active={pathname === "/factory/statistics"} routerLink={<Link to="statistics" />} icon={<SignalCellularAltIcon />}>
          {" "}
          Thống kê
        </MenuItem>
        <SubMenu label="Sản phẩm">
          <MenuItem active={pathname === "/factory/distribution"} routerLink={<Link to="distribution" />}>
            {" "}
            Xuất sản phẩm
          </MenuItem>
        </SubMenu>
      </NavSidebar>
  );
};

FacSidebar.propTypes = {};

export default FacSidebar;
