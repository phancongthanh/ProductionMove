import React, {useEffect} from "react";
import PropTypes from "prop-types";
import backend from '../../../../backend/index';
import useLoading from '../../../../hooks/useLoading';

const Statistics = () => {
  const {loading, setLoading} = useLoading()

  useEffect(() => {
    const getData = async () => {
      
      const Statistics = await backend.distributor.statusProductStatistics()
      return Statistics
    }
    setLoading(true)
    // console.log(getData())
    setLoading(false)
  }, [])

  return (
    <div className="mainContent">
      <div className="header">
        <div className="title">Thống kê</div>
      </div>
      <div>
        
      </div>
    </div>
  );
};

Statistics.propTypes = {};

export default Statistics;
