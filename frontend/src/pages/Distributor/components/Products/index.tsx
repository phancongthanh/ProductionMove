import { Box } from "@mui/material";
import CTable from "./components/CTable";
import Filters from "./components/Filters";
import { useState } from "react";

const Products = () => {
  const [filters, setFilters] = useState([])

  return (
    <div className="mainContent">
      <div className="header">
        <div className="title">Danh sách sản phẩm</div>
      </div>
      <Box sx={{ border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3}}>
        <div className='search'>Search</div>
        <Filters filters={filters} setFilters={setFilters}/>
        <div className='table'>
          <CTable />
        </div>
      </Box>
    </div>
  );
};

Products.propTypes = {};

export default Products;
