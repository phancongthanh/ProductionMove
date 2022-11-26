import { RoleSchema } from "../enums/RoleSchema";

export default interface User {
    userId: string,
    userName: string,   // Tên dùng để đăng nhập
    name: string,       // Tên để hiện thị
    phone: string,
    email: string,
    role: RoleSchema,   // quyền hạn của user này
    buildingId: string  // Id cơ sở nơi user này làm việc
}