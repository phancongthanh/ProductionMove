import { ProductStatus1 } from "./ProductStatus1";

export interface Customer {
    phone: string,
    name: string
}


export default interface Product1 {
    id: number,
    status: ProductStatus1,      // Trạng thái hiện tại của sản phẩm
    dateOfManufacture: Date,  // Ngày sản xuất
    saleDate: Date|null,      // Ngày bán, null nếu chưa bán
    productLineId: string,
    factoryId: string,          // Id cơ sở sản xuất
    distributionId: string|null,// Đơn hàng nhập, null nếu sản phẩm chưa được nhập vẫn ở cơ sở sản xuất
    customer: Customer|null     // Thông tin khách hàng mua, null nếu sản phẩm chưa bán
}