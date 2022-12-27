export default interface ProductCanceledStatisticsData {
    distributors: Array<DistributorProductCanceled>
}

export interface DistributorProductCanceled {
    distributorId: string,
    productLines: Array<ProductLineProductCanceled>
}

export interface ProductLineProductCanceled {
    productLineId: string,
    canceledCount: number,
    totalCount: number,
    canceledRate: number
}