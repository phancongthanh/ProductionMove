import Building from "../data/entities/Building";
import accounts from "./account";
import server from "./server";

export async function createBuilding(type: string, building: Building) : Promise<void> {
    const url = server.baseUrl + "/Buildings?type=" + type;

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        },
        body: JSON.stringify(building)
    });

    if (response.ok) return;
    throw new Error(await response.json());
}

export async function updateBuilding(type: string, building: Building) : Promise<void> {
    const url = server.baseUrl + "/Buildings?type=" + type;

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        },
        body: JSON.stringify(building)
    });

    if (response.ok) return;
    throw new Error(await response.json());
}

const buildings = {
    createBuilding,
    updateBuilding
}

export default buildings;