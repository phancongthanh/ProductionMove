import React, { FC } from 'react'
import { DistributorProductStatisticsItem, MonthProductStatistics, QuarterProductStatistics, YearProductStatistics } from '../../../../../data/models/ProductStatistics'
import LineChart from '../../../../../components/LineChart'
import { Box } from '@mui/material'
import { ProductStatusColor } from '../../../../../data/enums/ProductStatusColor'
import { getDarkerColor } from '../../../../../utils/GetDarkerColor'
import VerticalBarChart from '../../../../../components/VerticalBarChart';
import { DistributorProductCanceled } from '../../../../../data/models/ProductCanceledStatisticsData'


type propTypes = {
    statistics: DistributorProductCanceled[]
    text: string
}

const StatusStatistic: FC<propTypes> = ({statistics, text}) => {
    const labels = statistics.map((statistic) => statistic.distributorId)
    statistics.map((statistic) => statistic.productLines.map())

    let datasets = [
    {
        label: 'Export',
        data: statistics.map((statistic) => String(statistic.value.export)),
        borderColor: ProductStatusColor.JustImported,
        backgroundColor: getDarkerColor(ProductStatusColor.JustImported),
    },
    {
        label: 'Produced',
        data: statistics.map((statistic) => String(statistic.value.produced)),
        borderColor: ProductStatusColor.JustProduced,
        backgroundColor: getDarkerColor(ProductStatusColor.JustProduced),
    },
    ]
    const data = {
      labels,
      datasets
    }
  return (
    <Box sx={{flex: 1}}>
       <VerticalBarChart data={data} text={text}/>
    </Box>
  )
}

export default StatusStatistic