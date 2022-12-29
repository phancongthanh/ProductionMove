import Layout from "../Layout";
import { Route, Routes } from "react-router-dom";

import DisSidebar from "./components/DisSidebar";
import { Distribution, Products, Statistics } from "./components";
import useBuildings from "../../hooks/useBuildings";
import useProductLines from "../../hooks/useProductlines";
import { useEffect, useState } from "react";
import backend from "../../backend";

const Distributor = () => {
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
