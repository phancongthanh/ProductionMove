export interface FactoryModel {
    id: string,
    name: string,
    address: string
}

export interface DistributorModel {
    id: string,
    name: string,
    address: string
}

export interface ServiceCenterModel {
    id: string,
    name: string,
    address: string
}

export default interface BuildingsModel {
    factories: Array<FactoryModel>,
    distributors: Array<DistributorModel>,
    serviceCenters: Array<ServiceCenterModel>
}