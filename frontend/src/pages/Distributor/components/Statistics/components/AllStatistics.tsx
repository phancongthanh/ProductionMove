import React, { FC } from 'react'
import Statistics from './Statistic'
import ProductStatistics, { DistributorProductStatisticsItem } from '../../../../../data/models/ProductStatistics'
import { Stack } from '@mui/material'

type propTypes = {
    statistics: ProductStatistics<DistributorProductStatisticsItem>
}

const AllStatistics: FC<propTypes> = ({statistics}) => {
  return (
    <Stack direction={'row'} sx={{}} flexWrap='wrap' display={'flex'}>
        <Statistics statistics={statistics.yearStatistics} text='Thống kê trạng thái sản phẩm theo năm' type='year'/>
        <Statistics statistics={statistics.quarterStatistics} text='Thống kê trạng thái sản phẩm theo quý' type='quarter'/>
        <Statistics statistics={statistics.monthStatistics} text='Thống kê trạng thái sản phẩm theo tháng' type='month'/>
    </Stack>
  )
}

export default AllStatistics