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
import { Box, Typography } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import ListIcon from '@mui/icons-material/List';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AddIcon from '@mui/icons-material/Add';

const FacSidebar = () => {
    let pathname = useLocation().pathname;

  return (
    <NavSidebar>
        <MenuItem active={pathname === "/factory/statistics"} routerLink={<Link to="statistics" />} icon={<SignalCellularAltIcon />}>
          {" "}
          Thống kê
        </MenuItem>
        <MenuItem active={pathname === "/factory/products"} routerLink={<Link to="products" />} icon={<ListIcon />}>
            {" "}
            Xem sản phẩm
          </MenuItem>
          <MenuItem active={pathname === "/factory/add-product"} routerLink={<Link to="add-products" />} icon={<AddIcon />}>
            {" "}
            Thêm sản phẩm
          </MenuItem>
          <MenuItem active={pathname === "/factory/distribution"} routerLink={<Link to="distribution" />} icon={<DriveEtaIcon />}>
            {" "}
            Xuất sản phẩm
          </MenuItem>

      </NavSidebar>
  );
};

FacSidebar.propTypes = {};

export default FacSidebar;
