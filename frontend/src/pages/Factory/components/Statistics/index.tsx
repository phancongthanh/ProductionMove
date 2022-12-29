import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import backend from '../../../../backend/index';
import useLoading from '../../../../hooks/useLoading';
import ProductStatistics, { DistributorProductStatisticsItem } from "../../../../data/models/ProductStatistics";
import { FactoryProductStatisticsItem, } from '../../../../data/models/ProductStatistics';
import ProductCanceledStatisticsData from "../../../../data/models/ProductCanceledStatisticsData";
import AllStatusStatistics from "./components/AllStatusStatistics";
import ProductAnalysis from "../../../../data/models/ProductAnalysis";



const Statistics = () => {
  const {loading, setLoading} = useLoading()
  const [statusStatistics, setStatusStatistics] = useState<ProductStatistics<FactoryProductStatisticsItem>|null>(null)
  const [ExportAnalysis, setExportAnalysis] = useState<ProductStatistics<ProductAnalysis>|null> (null)
  const [CanceledRateStatistics, setCanceledRateStatistics] = useState<ProductCanceledStatisticsData|null>(null)

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      setStatusStatistics(await backend.factory.statusProductStatistics())
      setCanceledRateStatistics(await backend.factory.productCanceledRateStatistics())
      setExportAnalysis(await backend.factory.productExportAnalysis())
      // setSoldAnalysis(await backend.distributor.productSoldAnalysis())
    }
    
    setLoading(true)
    getData()
    setLoading(false)
  }, [])

  useEffect(() => {
    const arr = CanceledRateStatistics?.distributors.map((statistic) => statistic.productLines.map((productLine) => productLine.productLineId))
    const t = arr?.map(a=>a.length).indexOf(Math.max(...arr.map(a=>a.length)))
    // if(arr) const arr1 = CanceledRateStatistics?.distributors.map((statistic) => statistic.productLines.map((productLine) => {if(arr[0] === productLine.productLineId) productLine.canceledCount}))
    // console.log(arr1)
  }, [CanceledRateStatistics])

  useEffect(() => {
    console.log(ExportAnalysis)
  }, [ExportAnalysis])

  




  return (
    <div className="mainContent">
      <div className="header">
        <div className="title">Thống kê</div>
      </div>
      <div>
        {statusStatistics && <AllStatusStatistics statistics={statusStatistics}/>}
      </div>
    </div>
  );
};

Statistics.propTypes = {};

export default Statistics;
