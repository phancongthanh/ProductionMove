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

const AdminSidebar = () => {
    let pathname = useLocation().pathname;

  return (
    <NavSidebar>
        <MenuItem active={pathname === "/admin/statistics"} routerLink={<Link to="statistics" />} icon={<SignalCellularAltIcon />}>
          {" "}
          Thống kê
        </MenuItem>
        <SubMenu label="Sản phẩm" icon={<FaShoppingBag />}>
          <MenuItem active={pathname === "/admin/productLine"} routerLink={<Link to="productLine" />}>
            {" "}
            Dòng sản phẩm
          </MenuItem>
        </SubMenu>
        <MenuItem active={pathname === "/admin/Building"} routerLink={<Link to="Building" />}  icon={<BusinessIcon />}>
              {" "}
              Cơ sở
          </MenuItem>
        <SubMenu label="Tài khoản" icon={<FaUser />}>
          <MenuItem active={pathname === "/admin/createAccount"} routerLink={<Link to="createAccount" />} icon={<PersonAddAlt1Icon />}>
            {" "}
            Cấp Tài khoản
          </MenuItem>
            <MenuItem active={pathname === "/admin/accounts"} routerLink={<Link to="accounts" />}>
              {" "}
              Tài khoản
            </MenuItem>
        </SubMenu>
      </NavSidebar>
  );
};

AdminSidebar.propTypes = {};

export default AdminSidebar;
