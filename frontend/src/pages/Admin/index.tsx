import Layout from "../Layout";
import { Route, Routes } from "react-router-dom";
import { Accounts, ProductLine, CreateAccount, Statistics, Building } from "./components";

import AdminSidebar from "./components/AdminSidebar";

const Admin = () => {
  return (
    <Layout Sidebar={<AdminSidebar/>}>
      <Routes>
        <Route path="/productLine" element={<ProductLine />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/building" element={<Building />} />
        <Route path="/*" element={<Statistics />} />
      </Routes>
    </Layout>
  );
};

Admin.propTypes = {};

export default Admin;
