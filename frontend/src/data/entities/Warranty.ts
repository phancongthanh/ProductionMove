export default interface Warranty {
    id: string,
    productId: number,
    distributorId: string,
    serviceCenterId: string,
    startTime: Date|null,
    completedTime: Date|null,
    isSuccessed: boolean|null
}