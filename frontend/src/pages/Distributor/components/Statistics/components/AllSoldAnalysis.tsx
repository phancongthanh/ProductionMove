import React, { FC } from 'react'
import ProductStatistics, { DistributorProductStatisticsItem } from '../../../../../data/models/ProductStatistics'
import { Stack } from '@mui/material'
import StatusStatistics from './StatusStatistics'
import SoldAnalysis from './SoldAnalysis'

type propTypes = {
    statistics: ProductStatistics<DistributorProductStatisticsItem>
}

const AllSoldAnalysis: FC<propTypes> = ({statistics}) => {
  return (
    <Stack direction={'row'} sx={{}} flexWrap='wrap' display={'flex'}>
        <SoldAnalysis statistics={statistics.yearStatistics} text='Thống kê trạng thái sản phẩm theo năm' type='year'/>
        <SoldAnalysis statistics={statistics.quarterStatistics} text='Thống kê trạng thái sản phẩm theo quý' type='quarter'/>
        <SoldAnalysis statistics={statistics.monthStatistics} text='Thống kê trạng thái sản phẩm theo tháng' type='month'/>
    </Stack>
  )
}

export default AllSoldAnalysis