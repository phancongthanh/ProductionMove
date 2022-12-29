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
        label: 'Start',
        data: statistics.map((statistic) => String(statistic.value.completed)),
        borderColor: ProductStatusColor.Warranty,
        backgroundColor: getDarkerColor(ProductStatusColor.Warranty),
    },
    {
      label: 'Success',
      data: statistics.map((statistic) => String(statistic.value.successed)),
      borderColor: ProductStatusColor.WaitingForCustomer,
      backgroundColor: getDarkerColor(ProductStatusColor.WaitingForCustomer),
    },
    {
      label: 'Fail',
      data: statistics.map((statistic) => String(statistic.value.failed)),
      borderColor: ProductStatusColor.WaitingForFactory,
      backgroundColor: getDarkerColor(ProductStatusColor.WaitingForFactory),
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