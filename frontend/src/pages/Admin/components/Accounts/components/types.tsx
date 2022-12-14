import { RoleSchema } from "../../../../../data/enums/RoleSchema"

export type User = {
    userId: string,
    userName: string,   // Tên dùng để đăng nhập
    password: string,   // Tên dùng để đăng nhập
    name: string,       // Tên để hiện thị
    phone: string,
    email: string,
    role: RoleSchema,   // quyền hạn của user này
    building: string  // Id cơ sở nơi user này làm việc
}
