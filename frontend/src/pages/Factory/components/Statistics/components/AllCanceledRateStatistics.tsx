import React, { FC } from 'react'
import { Stack } from '@mui/material'
import ProductCanceledStatisticsData from '../../../../../data/models/ProductCanceledStatisticsData'
import CanceledRateStatistics from './CanceledRateStatistics'

type propTypes = {
    statistics: ProductCanceledStatisticsData
}

const AllCanceledRateStatistics: FC<propTypes> = ({statistics}) => {
  return (
    <Stack direction={'row'} flexWrap='wrap' display={'flex'}>
        {/* <CanceledRateStatistics statistics={statistics} text='Thống kê trạng thái sản phẩm theo năm'/> */}
    </Stack>
  )
}

export default AllCanceledRateStatistics