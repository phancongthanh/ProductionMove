export const enum ProductStatus1 {
    JustProduced = 'JustProduced',               // Sản phẩm vừa sản xuất vẫn đang ở cở sở sản xuất
    JustImported = 'JustImported',               // Sản phẩm vừa được nhập về đại lý phân phối
    Sold = 'Sold',                       // Sản phẩm đã được bán
    Warranty = 'Warranty',                   // Sản phẩm được đưa đi bảo hành, hiện đang ở 1 trung tâm bảo hành
    Waiting = 'Waiting',                    // Sản phẩm đã bảo hành xong, đang ở đại lý phân phối chờ khách hàng đến lấy
    Recall = 'Recall',                     // Sản phẩm bị lỗi(recall), sản phẩm vẫn đang trong tay khách hàng
    Canceled = 'Canceled',                   // Sản phẩm bị lỗi không sửa được nên bị hủy
    WarrantyExpired = 'WarrantyExpired'             // Sản phẩm hết hạn bảo hành
}