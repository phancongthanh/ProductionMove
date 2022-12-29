import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import backend from '../../../../backend/index';
import useLoading from '../../../../hooks/useLoading';
import ProductStatistics, { DistributorProductStatisticsItem } from "../../../../data/models/ProductStatistics";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import YearStatistics from "./components/Statistic";
import AllStatistics from "./components/AllStatistics";
import ProductAnalysis from "../../../../data/models/ProductAnalysis";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Statistics = () => {
  const {loading, setLoading} = useLoading()
  const [statusStatistics, setStatusStatistics] = useState<ProductStatistics<DistributorProductStatisticsItem>|null>(null)
  const [soldAnalysis, setSoldAnalysis] = useState<ProductAnalysis|null> (null)
  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      setStatusStatistics(await backend.distributor.statusProductStatistics())
      setSoldAnalysis(await backend.distributor.productSoldAnalysis())
      
    }
    setLoading(true)
    getData()
    setLoading(false)
  }, [])

  useEffect(() => {

    // console.log(soldAnalysis)
  }, [soldAnalysis])


  return (
    <div className="mainContent">
      <div className="header">
        <div className="title">Thống kê</div>
      </div>
      <div>
        {statusStatistics && <AllStatistics statistics={statusStatistics}/>}
      </div>
    </div>
  );
};

Statistics.propTypes = {};

export default Statistics;
