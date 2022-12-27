export default interface ProductAnalysis {
    MonthAnalysis: MonthAnalysis,
    QuarterAnalyses: QuarterAnalysis,
    YearAnalyses: YearAnalysis
}

export interface MonthAnalysis {
    year: number,
    quarter: number,
    month: number,
    previousValue: number,
    value: number,
    percentage: number
}

export interface QuarterAnalysis {
    year: number,
    quarter: number,
    previousValue: number,
    value: number,
    percentage: number
}

export interface YearAnalysis {
    year: number,
    previousValue: number,
    value: number,
    percentage: number
}