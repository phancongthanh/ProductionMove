import jwtDecode from "jwt-decode";
import LoginRequest from "../data/models/LoginRequest";
import LoginResponse from "../data/models/LoginResponse";

import server from "./server";
import storage from "../storage";

export async function login(request: LoginRequest) : Promise<LoginResponse> {
    const url = server.baseUrl + "/Account/Login";
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
    if (response.ok) return response.json();
    throw response.status;
}

interface Token {
    exp: number
}

export async function refreshTokenRequest(refreshToken: string, accessToken: string) : Promise<string|null> {
    const url = server.baseUrl + '/Account/GetAccessToken?oldAccessToken=' + accessToken;
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + refreshToken
        }
    })
    if (response.ok) {
        const result = await response.text();
        storage.setAccessToken(result);
        return result;
    }
    return null;
}

export async function getAccessToken() : Promise<string|null> {
    const accessToken = storage.getAccessToken();
    if (!accessToken) throw new Error();

    // Nếu có access token hợp lệ
    if (jwtDecode<Token>(accessToken || '{}').exp > Date.now() / 1000) return accessToken;
    
    // Nếu access token hết hạn => request refresh token
    const refreshToken = storage.getRefreshToken();
    if (!refreshToken) throw new Error();
    if (jwtDecode<Token>(refreshToken || '{}').exp > Date.now() / 1000) {
        const newAccessToken = await refreshTokenRequest(refreshToken, accessToken);
        if (newAccessToken) return newAccessToken;
    }

    // refresh token không thể lấy access token
    return null;
}

export async function logOut() : Promise<void> {
    const url = server.baseUrl + "/Account/Logout";

    const accessToken = await getAccessToken();
    if (!accessToken) return;

    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        }
    });
}

const accounts = {
    login,
    logOut,
    refreshTokenRequest,
    getAccessToken
}

export default accounts;