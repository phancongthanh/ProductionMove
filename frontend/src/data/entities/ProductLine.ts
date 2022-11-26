export interface ProductLineInfo {
    property: string,
    value: string
}

export default interface ProductLine {
    id: string,
    name: string,
    warrantyPeriod: number,             // Thời gian bảo hành của dòng sản phẩm này
    describes: Array<ProductLineInfo>   // Thông số của dòng sản phẩm này
}