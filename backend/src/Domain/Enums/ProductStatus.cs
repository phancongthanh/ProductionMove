namespace ProductionMove.Domain.Enums;
public enum ProductStatus
{
    JustProduced = 0,           // in Factory                   to Distributor    
    JustImported = 1,           // in Distributor               to Customer(buy), Distributor(recall), Factory()
    Sold = 2,                   // in Customer                  to Distributor(warranty, recall)
    WaitingForWarranty = 3,     // in Distributor               to ServiceCenter(warranty)
    Warranty = 4,               // in ServiceCenter             to Distributor(Successed), Factory(Error)
    WaitingForCustomer = 5,     // in Distributor               to Customer
    WaitingForFactory = 6,      // in ServiceCenter             to Factory
    Canceled = 7,               // in Factory
    Recall = 8,                 // in [Distributor,Customer]    to Distributor()
    WarrantyExpired = 9,        // in everywhere
    Inventory = 10
}
/*
0 - Mới sản xuất: Sản xuất tại cơ sở nào thì nằm tại kho của cơ sở đó.
1 - Đưa về đại lý: Đại lý nào.
2 - Đã bán: Khách hàng nào (Thông tin của khách hàng).
3 - Lỗi, cần bảo hành: Bảo hành lần thứ mấy, đại lý đã nhận lại từ khách hàng.
4 - Đang sửa chữa bảo hành: Ở trung tâm bảo hành nào.
5 - Đã bảo hành xong: Quay lại đại lý.
2 - Đã trả lại bảo hành cho khách hàng: Quay lại khách hàng
6 - Lỗi, cần trả về nhà máy: Đang ở trung tâm bảo hành nào.
7 - Lỗi, đã đưa về cơ sở sản xuất: Cơ sở sản xuất nào.
8 - Lỗi cần triệu hồi: Đang ở khách hàng (sản phẩm triệu hồi được đưa đi bảo hành như sản phẩm khách hàng chủ động yêu cầu bảo hành).
9 - Hết thời gian bảo hành.
10- Trả lại cơ sở sản xuất (do lâu không bán được) 
 */