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

const Statistics: FC<propTypes> = ({statistics, text, type}) => {
    const labels = type === 'year' ? statistics.map((statistic) => String(statistic.year)):
                    type === 'month' ? statistics.map((statistic) => String('T' +(statistic.month+1) + '/' + statistic.year)):
                    type === 'quarter' ? statistics.map((statistic) => String('Q'+(statistic.quarter+1)+ '/' + statistic.year)): null
    
    let datasets = [
    {
        label: 'Imported',
        data: statistics.map((statistic) => String(statistic.value.imported)),
        borderColor: ProductStatusColor.JustImported,
        backgroundColor: getDarkerColor(ProductStatusColor.JustImported),
    },
    {
        label: 'Sold',
        data: statistics.map((statistic) => String(statistic.value.sold)),
        borderColor: ProductStatusColor.Sold,
        backgroundColor: getDarkerColor(ProductStatusColor.Sold),
    },
    {
        label: 'Warranty',
        data: statistics.map((statistic) => String(statistic.value.warranty)),
        borderColor: ProductStatusColor.WaitingForWarranty,
        backgroundColor: getDarkerColor(ProductStatusColor.WaitingForWarranty),
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

export default Statistics