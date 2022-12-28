import { FaBars } from "react-icons/fa";
import { useProSidebar } from "react-pro-sidebar";
import { Avatar } from "@mui/material";
import { IconButton } from '@mui/material';

import "./styles.scss";

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
