import React, { FC } from 'react'
import { DistributorProductStatisticsItem, MonthProductStatistics, QuarterProductStatistics, YearProductStatistics } from '../../../../../data/models/ProductStatistics'
import LineChart from '../../../../../components/LineChart'
import { Box } from '@mui/material'
import { ProductStatusColor } from '../../../../../data/enums/ProductStatusColor'
import { getDarkerColor } from '../../../../../utils/GetDarkerColor'
import VerticalBarChart from '../../../../../components/VerticalBarChart';
import ProductCanceledStatisticsData from '../../../../../data/models/ProductCanceledStatisticsData'

type propTypes = {
    statistics: ProductCanceledStatisticsData
    text: string
}

const dynamicColors = function() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};

const CanceledRateStatistics: FC<propTypes> = ({statistics, text}) => {
    // const colors:[] = statistics.productLines.length

    const labels = statistics.distributors.map((d) => d.name)
    let datasets = statistics.productLines.map((productLine) => ({
      label: productLine.productLineId,
      data: productLine.distributorRates.map((d) => d*100),
      backgroundColor: dynamicColors,
    }))
    const data = {
      labels,
      datasets
    }
  return (
    <Box sx={{flex: 1}}>
       <VerticalBarChart data={data} text={text} large/>
    </Box>
  )
}

export default CanceledRateStatistics