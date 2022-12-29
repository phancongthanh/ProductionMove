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
import YearStatistics from "./components/StatusStatistics";
import AllStatusStatistics from "./components/AllStatusStatistics";
import ProductAnalysis from "../../../../data/models/ProductAnalysis";
import AllSoldAnalysis from "./components/AllSoldAnalysis";
import { Divider, Container, Typography, Stack, Box } from '@mui/material';

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
    console.log(soldAnalysis)
  }, [soldAnalysis])


  return (
    <div className="mainContent">
      <div className="header">
        <div className="title">Thống kê</div>
      </div>
      <div>
        <Stack spacing={4}>
        <Stack sx={{border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3, padding: '10px'}} spacing={4}>
            <Typography variant="h5">Thống kê trạng thái sản phẩm</Typography>
            {statusStatistics && <AllStatusStatistics statistics={statusStatistics}/>}
          </Stack>
          <Divider sx={{margin:4}}/>
          <Stack sx={{border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3, padding: '10px'}} spacing={4}>
          <Typography variant="h5">Phân tích sản phẩm bán được</Typography>
          {soldAnalysis && <AllSoldAnalysis analysis={soldAnalysis}/>}
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

Statistics.propTypes = {};

export default Statistics;
