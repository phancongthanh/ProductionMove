export default interface ProductStatistics<T> {
    yearStatistics: Array<YearProductStatistics<T>>,
    quarterStatistics: Array<QuarterProductStatistics<T>>,
    monthStatistics: Array<MonthProductStatistics<T>>
}

export interface YearProductStatistics<T> {
    year: number,
    value: T
}

export interface QuarterProductStatistics<T> {
    year: number,
    quarter: number,
    value: T
}

export interface MonthProductStatistics<T> {
    year: number,
    quarter: number,
    month: number,
    value: T
}

export interface FactoryProductStatisticsItem {
    produced: number,
    export: number
}

export interface DistributorProductStatisticsItem {
    imported: number,
    sold: number,
    warranty: number
}

export interface ServiceCenterProductStatisticsItem {
    Start: number,
    Completed: number,
    Successed: number,
    Failed: number
}