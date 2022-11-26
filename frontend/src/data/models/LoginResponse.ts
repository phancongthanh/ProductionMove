import User from "./User";

export default interface LoginResponse {
    user: User,
    refreshToken: string,
    accessToken: string
}