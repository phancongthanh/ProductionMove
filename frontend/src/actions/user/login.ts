import LoginRequest from "../../data/models/LoginRequest";
import LoginResponse from "../../data/models/LoginResponse";

import storage from "../../storage";
import backend from "../../backend";

export default async function login(userName: string, password: string) : Promise<LoginResponse> {
    const loginRequest: LoginRequest = {
        userName,
        password
    }
    try {
        const loginResponse = await backend.accounts.login(loginRequest);
        storage.setUser(loginResponse.user)
        storage.setRefreshToken(loginResponse.refreshToken);
        storage.setAccessToken(loginResponse.accessToken);
        // Code xử lý khi thành công
        return loginResponse;
    } catch (e) {
        // Code xử lý khi thất bại
        throw e;
    }
}