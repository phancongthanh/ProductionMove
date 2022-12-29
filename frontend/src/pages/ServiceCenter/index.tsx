import Layout from "../Layout";
import { Route, Routes } from "react-router-dom";

import SerSidebar from "./components/SerSidebar";
import { Products, Statistics } from "./components";

const Service = () => {
  return (
    <Layout Sidebar={<SerSidebar/>}>
      <Routes>
        <Route path="/*" element={<Statistics />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Layout>
  );
};

Service.propTypes = {};

export default Service;
