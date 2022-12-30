import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import { Link, useLocation  } from "react-router-dom";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import NavSidebar from "../../../components/NavSidebar";
import ListIcon from '@mui/icons-material/List';
import DriveEtaIcon from '@mui/icons-material/DriveEta';

const DisSidebar = () => {
    let pathname = useLocation().pathname;

  return (
    <NavSidebar>
        <MenuItem active={pathname === "/distributor/statistics"} routerLink={<Link to="statistics" />} icon={<SignalCellularAltIcon />}>
          {" "}
          Thống kê
        </MenuItem>
          <MenuItem active={pathname === "/distributor/distribution"} routerLink={<Link to="distribution" />} icon={<DriveEtaIcon />}>
            {" "}
            Nhập sản phẩm
          </MenuItem>
          <MenuItem active={pathname === "/distributor/products"} routerLink={<Link to="products" />} icon={<ListIcon />}>
            {" "}
            Danh sách sản phẩm
          </MenuItem>
      </NavSidebar>
  );
};

export default DisSidebar;
