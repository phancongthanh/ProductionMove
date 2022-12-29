import React, { FC } from 'react'
import { DistributorProductStatisticsItem, MonthProductStatistics, QuarterProductStatistics, YearProductStatistics } from '../../../../../data/models/ProductStatistics'
import LineChart from '../../../../../components/LineChart'
import { Box } from '@mui/material'
import { ProductStatusColor } from '../../../../../data/enums/ProductStatusColor'
import { getDarkerColor } from '../../../../../utils/GetDarkerColor'
import VerticalBarChart from '../../../../../components/VerticalBarChart';
import ProductCanceledStatisticsData from '../../../../../data/models/ProductCanceledStatisticsData'
import { Console } from 'console'
import dynamicColors from '../../../../../utils/dynamicColors'

type propTypes = {
    statistics: ProductCanceledStatisticsData
    text: string
}



const CanceledRateStatistics: FC<propTypes> = ({statistics, text}) => {
    const colors = statistics.productLines.map(() => dynamicColors())

    const labels = statistics.distributors.map((d) => d.name)
    const datasets = statistics.productLines.map((productLine, index) => ({
      label: productLine.productLineId,
      data: productLine.distributorRates.map((d) => d*100),
      backgroundColor: colors[index],
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