import Layout from "../Layout";
import { Route, Routes } from "react-router-dom";

import FacSidebar from "./components/FacSidebar";
import { AddProducts, Distribution, Products, Statistics } from "./components";
import backend from "../../backend";
import useBuildings from "../../hooks/useBuildings";
import useProductLines from "../../hooks/useProductlines";
import { useEffect } from "react";

const Factory = () => {
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
