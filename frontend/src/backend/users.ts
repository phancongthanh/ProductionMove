import User from "../data/models/User";
import accounts from "./account";
import server from "./server";

export async function getUser(userId: string) : Promise<User> {
    const url = server.baseUrl + "/Users?userId=" + userId;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) return await response.json();
    throw await response.json();
}

export async function getUsers() : Promise<User[]> {
    const url = server.baseUrl + "/Users";

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) return await response.json();
    throw await response.json();
}

export async function createUser(user: User, password: string) : Promise<void> {
    const url = server.baseUrl + "/Users";

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        },
        body: JSON.stringify({user, password})
    });

    if (response.ok) return;
    throw await response.json();
}

export async function changePassword(userId: string, password: string) : Promise<void> {
    const url = server.baseUrl + "/Users";

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        },
        body: JSON.stringify({userId, password})
    });

    if (response.ok) return;
    throw await response.json();
}

export async function changeUser(user: User) : Promise<void> {
    const url = server.baseUrl + "/Users";

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        },
        body: JSON.stringify(user)
    });

    if (response.ok) return;
    throw await response.json();
}

export async function deleteUser(userId: string) : Promise<void> {
    const url = server.baseUrl + "/Users?userId=" + userId;

    const accessToken = await accounts.getAccessToken();
    console.log(accessToken)
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        }
    });

    if (response.ok) return;
    throw await response.json();
}

const users = {
    getUser,
    getUsers,
    createUser,
    changePassword,
    changeUser,
    deleteUser
}

export default users