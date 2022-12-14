import Layout from "../Layout";
import { Route, Routes } from "react-router-dom";
// import { Accounts, ProductLine, CreateAccount, Analytic, Building } from "./components";

import DisSidebar from "./components/DisSidebar";
import { Distribution, Products, Statistics } from "./components";

const Distributor = () => {
  return (
    <Layout Sidebar={<DisSidebar/>}>
      <Routes>
        <Route path="/*" element={<Statistics />} />
        <Route path="/distribution" element={<Distribution />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Layout>
  );
};

Distributor.propTypes = {};

export default Distributor;
