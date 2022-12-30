import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingBag , FaUser } from "react-icons/fa";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import BusinessIcon from '@mui/icons-material/Business';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import NavSidebar from "../../../components/NavSidebar";
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import ListIcon from '@mui/icons-material/List';

const AdminSidebar = () => {
  let pathname = useLocation().pathname;

  return (
    <NavSidebar>
        <SubMenu label="Sản phẩm" icon={<FaShoppingBag />}>
          <MenuItem active={pathname === "/admin/productLine"} routerLink={<Link to="productLine" />} icon={<CategoryIcon />}>
            {" "}
            Dòng sản phẩm
          </MenuItem>
          <MenuItem active={pathname === "/admin/products"} routerLink={<Link to="products" />} icon={<ListIcon />}>
            {" "}
            Danh sách sản phẩm
          </MenuItem>
        </SubMenu>
        <MenuItem active={pathname === "/admin/Building"} routerLink={<Link to="Building" />} icon={<BusinessIcon />}>
              {" "}
              Cơ sở
          </MenuItem>
        <SubMenu label="Tài khoản" icon={<FaUser />}>
          <MenuItem active={pathname === "/admin/createAccount"} routerLink={<Link to="createAccount" />} icon={<PersonAddAlt1Icon />}>
            {" "}
            Cấp Tài khoản
          </MenuItem>
            <MenuItem active={pathname === "/admin/accounts"} routerLink={<Link to="accounts" />} icon={<PersonIcon />}>
              {" "}
              Tài khoản
            </MenuItem>
        </SubMenu>
      </NavSidebar>
  );
};

AdminSidebar.propTypes = {};

export default AdminSidebar;
