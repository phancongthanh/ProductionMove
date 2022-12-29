import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import backend from '../../../../backend/index';
import useLoading from '../../../../hooks/useLoading';
import ProductStatistics, { DistributorProductStatisticsItem } from "../../../../data/models/ProductStatistics";
import { FactoryProductStatisticsItem, } from '../../../../data/models/ProductStatistics';
import ProductCanceledStatisticsData from "../../../../data/models/ProductCanceledStatisticsData";
import AllStatusStatistics from "./components/AllStatusStatistics";
import ProductAnalysis from "../../../../data/models/ProductAnalysis";
import { Divider, Stack, Typography } from "@mui/material";
import AllExportAnalysis from "./components/AllExportAnalysis";



const Statistics = () => {
  const {loading, setLoading} = useLoading()
  const [statusStatistics, setStatusStatistics] = useState<ProductStatistics<FactoryProductStatisticsItem>|null>(null)
  const [exportAnalysis, setExportAnalysis] = useState<ProductStatistics<ProductAnalysis>|null> (null)
  const [CanceledRateStatistics, setCanceledRateStatistics] = useState<ProductCanceledStatisticsData|null>(null)

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      setStatusStatistics(await backend.factory.statusProductStatistics())
      setExportAnalysis(await backend.factory.productExportAnalysis())
      setCanceledRateStatistics(await backend.factory.productCanceledRateStatistics())
    }
    
    setLoading(true)
    getData()
    setLoading(false)
  }, [])


  useEffect(() => {
    console.log(CanceledRateStatistics)
  }, [CanceledRateStatistics])

  




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
          <Typography variant="h5">Phân tích sản phẩm được xuất</Typography>
          {exportAnalysis && <AllExportAnalysis analysis={exportAnalysis}/>}
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

Statistics.propTypes = {};

export default Statistics;
