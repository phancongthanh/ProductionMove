import Building from "../data/entities/Building";
import BuildingsModel from "../data/models/BuildingsModel";
import accounts from "./account";
import server from "./server";

export async function getBuildings() : Promise<BuildingsModel> {
    const url = server.baseUrl + "/Buildings";

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) return await response.json();
    throw response.status;
}

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
    throw response.status;
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
    throw response.status;
}

const buildings = {
    getBuildings,
    createBuilding,
    updateBuilding
}

export default buildings;