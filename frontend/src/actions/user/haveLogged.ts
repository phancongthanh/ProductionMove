import jwtDecode from "jwt-decode";
import backend from "../../backend";
import storage from "../../storage";

interface Token {
    exp: number
}

export function isLogged() {
    const accessToken = storage.getAccessToken();
    const refreshToken = storage.getRefreshToken();

    if (accessToken == null || refreshToken == null) return false;
    
    if (jwtDecode<Token>(refreshToken || '{}').exp < Date.now() / 1000) return false;

    return true;
}

export default async function haveLogged() : Promise<boolean> {
    const accessToken = storage.getAccessToken();
    const refreshToken = storage.getRefreshToken();

    if (accessToken == null || refreshToken == null) return false;
    
    if (jwtDecode<Token>(refreshToken || '{}').exp < Date.now() / 1000) return false;

    const newAccessToken = await backend.accounts.refreshTokenRequest(refreshToken, accessToken);

    if (!newAccessToken) return false;

    storage.setAccessToken(newAccessToken);
    return true;
}