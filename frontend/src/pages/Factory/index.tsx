import Layout from "../Layout";
import { Route, Routes } from "react-router-dom";
// import { Accounts, ProductLine, CreateAccount, Analytic, Building } from "./components";

import FacSidebar from "./components/FacSidebar";
import { AddProducts, Distribution, Products, Statistics } from "./components";
import Product from '../../data/entities/Product';
import backend from "../../backend";

const Factory = () => {
  backend.factory.statusProductStatistics()
  .then(r => console.log(r))
  return (
    <Layout Sidebar={<FacSidebar/>}>
      <Routes>
        <Route path="/*" element={<Statistics />} />
        <Route path="/distribution" element={<Distribution />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-products" element={<AddProducts />} />
      </Routes>
    </Layout>
  );
};

Factory.propTypes = {};

export default Factory;
