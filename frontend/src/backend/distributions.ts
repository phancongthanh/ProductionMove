import accounts from "./account";
import server from "./server"

export async function addDistribution(factoryId: string, distributorId: string, productLineId: string, fromId: number, toId: number) : Promise<void> {
    const url = server.baseUrl + "/Distributions"
        + "?factoryId=" + factoryId
        + "&distributorId=" + distributorId
        + "&productLineId=" + productLineId
        + "&fromId=" + fromId
        + "&toId=" + toId;
    
    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        }
    });
    if (response.ok) return;
    throw await response.json();
}

const distributions = {
    addDistribution
}

export default distributions