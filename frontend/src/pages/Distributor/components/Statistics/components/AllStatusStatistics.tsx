import React, { FC } from 'react'
import ProductStatistics, { DistributorProductStatisticsItem } from '../../../../../data/models/ProductStatistics'
import { Stack } from '@mui/material'
import StatusStatistics from './StatusStatistics'

type propTypes = {
    statistics: ProductStatistics<DistributorProductStatisticsItem>
}

const AllStatusStatistics: FC<propTypes> = ({statistics}) => {
  return (
    <Stack direction={'row'} sx={{}} flexWrap='wrap' display={'flex'}>
        <StatusStatistics statistics={statistics.yearStatistics} text='Thống kê trạng thái sản phẩm theo năm' type='year'/>
        <StatusStatistics statistics={statistics.quarterStatistics} text='Thống kê trạng thái sản phẩm theo quý' type='quarter'/>
        <StatusStatistics statistics={statistics.monthStatistics} text='Thống kê trạng thái sản phẩm theo tháng' type='month'/>
    </Stack>
  )
}

export default AllStatusStatistics