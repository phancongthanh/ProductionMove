import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
//import CTable from "./components/CTable";

const Products = () => {
  return (
    <div className="mainContent">
      <div className="header">
        <div className="title">Sản phẩm</div>
      </div>
      <Box sx={{ border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3}}>
        <div className='search'>Search</div>
        <div className='filter'>Filter</div>
        <div className='table'>
          {
            //<CTable />
          }
        </div>
      </Box>
    </div>
  );
};

Products.propTypes = {};

export default Products;
