import Layout from "../Layout";
import { Route, Routes } from "react-router-dom";
// import { Accounts, ProductLine, CreateAccount, Analytic, Building } from "./components";

import FacSidebar from "./components/FacSidebar";
import { Distribution, Statistics } from "./components";

const Factory = () => {
  return (
    <Layout Sidebar={<FacSidebar/>}>
      <Routes>
        <Route path="/*" element={<Statistics />} />
        <Route path="/distribution" element={<Distribution />} />
      </Routes>
    </Layout>
  );
};

Factory.propTypes = {};

export default Factory;
