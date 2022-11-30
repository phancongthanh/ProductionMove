import accounts from "./account";
import server from "./server"

export async function addDistribution(distributorId: string, fromId: number, toId: number) : Promise<void> {
    const url = server.baseUrl + "/Distributions"
        + "?distributorId=" + distributorId
        + "&fromId=" + fromId
        + "&toId=" + toId;
    
    const accessToken = accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        }
    });
    if (response.ok) return;
    throw new Error(await response.json());  
}

const distributions = {
    addDistribution
}

export default distributions