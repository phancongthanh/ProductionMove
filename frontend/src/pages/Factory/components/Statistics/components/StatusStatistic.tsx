import React, { FC } from 'react'
import { DistributorProductStatisticsItem, MonthProductStatistics, QuarterProductStatistics, YearProductStatistics } from '../../../../../data/models/ProductStatistics'
import LineChart from '../../../../../components/LineChart'
import { Box } from '@mui/material'
import { ProductStatusColor } from '../../../../../data/enums/ProductStatusColor'
import { getDarkerColor } from '../../../../../utils/GetDarkerColor'


type propTypes = {
    statistics: any[]
    text: string
    type: 'year' | 'month' | 'quarter'
}

const StatusStatistic: FC<propTypes> = ({statistics, text, type}) => {
    const labels = type === 'year' ? statistics.map((statistic) => String(statistic.year)):
                    type === 'month' ? statistics.map((statistic) => String('T' +(statistic.month+1) + '/' + statistic.year)):
                    type === 'quarter' ? statistics.map((statistic) => String('Q'+(statistic.quarter+1)+ '/' + statistic.year)): null
    
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
       <LineChart data={data} text={text}/>
    </Box>
  )
}

export default StatusStatistic