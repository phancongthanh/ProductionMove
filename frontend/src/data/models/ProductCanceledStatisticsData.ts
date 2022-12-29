import { DistributorModel } from "./BuildingsModel";

export default interface ProductCanceledStatisticsData {
    distributors: Array<DistributorModel>,
    productLines: Array<ProductLineProductCanceled>
}

export interface ProductLineProductCanceled {
    productLineId: string,
    distributorRates: Array<number>
}

/*
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
*/