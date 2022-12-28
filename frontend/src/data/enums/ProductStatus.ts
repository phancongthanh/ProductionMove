export const enum ProductStatus {
    JustProduced = 0,               // Sản phẩm vừa sản xuất vẫn đang ở cở sở sản xuất
    JustImported = 1,               // Sản phẩm vừa được nhập về đại lý phân phối
    Sold = 2,                       // Sản phẩm đã được bán
    WaitingForWarranty = 3,
    Warranty = 4,                   // Sản phẩm được đưa đi bảo hành, hiện đang ở 1 trung tâm bảo hành
    WaitingForCustomer = 5,         // Sản phẩm đã bảo hành xong, đang ở đại lý phân phối chờ khách hàng đến lấy
    WaitingForFactory = 6,
    Canceled = 7,                   // Sản phẩm bị lỗi không sửa được nên bị hủy
    Recall = 8,                     // Sản phẩm bị lỗi(recall), sản phẩm vẫn đang trong tay khách hàng
    WarrantyExpired = 9,            // Sản phẩm hết hạn bảo hành
    Inventory = 10
}