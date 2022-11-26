export const enum ProductStatus {
    JustProduced = 0,               // Sản phẩm vừa sản xuất vẫn đang ở cở sở sản xuất
    JustImported = 1,               // Sản phẩm vừa được nhập về đại lý phân phối
    Sold = 2,                       // Sản phẩm đã được bán
    Warranty = 3,                   // Sản phẩm được đưa đi bảo hành, hiện đang ở 1 trung tâm bảo hành
    Waiting = 4,                    // Sản phẩm đã bảo hành xong, đang ở đại lý phân phối chờ khách hàng đến lấy
    Recall = 5,                     // Sản phẩm bị lỗi(recall), sản phẩm vẫn đang trong tay khách hàng
    Canceled = 6,                   // Sản phẩm bị lỗi không sửa được nên bị hủy
    WarrantyExpired = 7             // Sản phẩm hết hạn bảo hành
}