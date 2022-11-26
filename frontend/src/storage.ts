import User from "./data/models/User";

function setRefreshToken(refreshToken: string) {
    localStorage.setItem("refreshToken", refreshToken);
}

function getRefreshToken() {
    return localStorage.getItem("refreshToken");
}

function setAccessToken(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
}

function getAccessToken() {
    return localStorage.getItem("accessToken");
}

let cacheUser: User|undefined = undefined;

function setUser(user: User) {
    cacheUser = user;
    localStorage.setItem("user", JSON.stringify(user));
}

function getUser() : User|undefined {
    if (!cacheUser) {
        const user = localStorage.getItem("user");
        if (!user) return undefined;
        cacheUser = JSON.parse(user);
    }
    return cacheUser;
}

function getUserId() : string|undefined {
    if (!cacheUser) {
        const user = localStorage.getItem("user");
        if (!user) return undefined;
        cacheUser = JSON.parse(user);
    }
    return cacheUser?.userId;
}

function clear() {
    sessionStorage.clear();
    localStorage.clear();
}

const storage = {
    getUserId,
    setUser,
    getUser,
    setRefreshToken,
    getRefreshToken,
    setAccessToken,
    getAccessToken,
    clear
}

export default storage