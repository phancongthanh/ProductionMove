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
import ListIcon from '@mui/icons-material/List';

const SerSidebar = () => {
    let pathname = useLocation().pathname;

  return (
    <NavSidebar>
        <MenuItem active={pathname === "/factory/statistics"} routerLink={<Link to="statistics" />} icon={<SignalCellularAltIcon />}>
          {" "}
          Thống kê
        </MenuItem>
          <MenuItem active={pathname === "/factory/products"} routerLink={<Link to="products" />} icon={<ListIcon />}>
            {" "}
            Danh sách sản phẩm
          </MenuItem>
      </NavSidebar>
  );
};

SerSidebar.propTypes = {};

export default SerSidebar;
