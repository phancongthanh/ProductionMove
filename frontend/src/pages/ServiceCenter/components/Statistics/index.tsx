import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import backend from '../../../../backend/index';
import useLoading from '../../../../hooks/useLoading';
import ProductStatistics, { DistributorProductStatisticsItem, ServiceCenterProductStatisticsItem } from "../../../../data/models/ProductStatistics";
import AllStatusStatistics from "./components/AllStatusStatistics";


const Statistics = () => {
  const {loading, setLoading} = useLoading()
  const [statusStatistics, setStatusStatistics] = useState<ProductStatistics<ServiceCenterProductStatisticsItem>|null>(null)

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      setStatusStatistics(await backend.serviceCenter.statusProductStatistics())
    }
    
    setLoading(true)
    getData()
    setLoading(false)
  }, [])

  useEffect(() => {
    console.log(statusStatistics)
  }, [statusStatistics])

  




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
