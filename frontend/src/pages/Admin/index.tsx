import Layout from "../Layout";
import { Route, Routes } from "react-router-dom";
import { Accounts, ProductLine, CreateAccount, Building, Products } from "./components";

import AdminSidebar from "./components/AdminSidebar";
import useBuildings from "../../hooks/useBuildings";
import useProductLines from "../../hooks/useProductlines";
import backend from "../../backend";
import { useEffect } from "react";

const Admin = () => {
  const { setBuildings } = useBuildings();
  const { setProductLines } = useProductLines();
  
  const getData = async () => {
    const buildings = await backend.buildings.getBuildings();
    setBuildings(buildings);
    const productLines = await backend.productLines.getProductLines();
    setProductLines(productLines);
  }

  useEffect(() => {
    getData().then(() => {}).catch(() => {});
  }, [])


  return (
    <Layout Sidebar={<AdminSidebar/>}>
      <Routes>
        <Route path="/productLine" element={<ProductLine />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/building" element={<Building />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Layout>
  );
};

Admin.propTypes = {};

export default Admin;
