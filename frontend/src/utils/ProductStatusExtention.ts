import { ProductStatus } from "../data/enums/ProductStatus";

export const VNProductStatus = ["Trong kho cơ sở sản xuất", "Trong kho đại lý phân phối", "Đã bán",
    "Đang đợi bảo hành", "Đang bảo hành", "Đợi khách hàng đến lấy", "Đợi nhà máy hủy",
    "Lỗi, đã hủy", "Gọi thu hồi", "Hết bảo hành", "Hàng tồn kho"];

export const ENProductStatus = ["JustProduced", "JustImported", "Sold",
    "WaitingForWarranty", "Warranty", "WaitingForCustomer", "WaitingForFactory",
    "Canceled", "Recall", "WarrantyExpired", "Inventory"];

export const toVN = (status: ProductStatus) => VNProductStatus[status];

export const toEN = (status: ProductStatus) => ENProductStatus[status];