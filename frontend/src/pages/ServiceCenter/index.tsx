import Layout from "../Layout";
import { Route, Routes } from "react-router-dom";

import SerSidebar from "./components/SerSidebar";
import { Products, Statistics } from "./components";
import useBuildings from "../../hooks/useBuildings";
import useProductLines from "../../hooks/useProductlines";
import backend from "../../backend";
import { useEffect } from "react";

const Service = () => {
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
