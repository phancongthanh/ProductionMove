import accounts from "./account";
import server from "./server"

export async function addProduct(productLineId: string, fromId: number, toId: number) : Promise<void> {
    const url = server.baseUrl + "/Products"
        + "?productLineId=" + productLineId
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
    throw new Error(await response.json())
}

const products = {
    addProduct
}

export default products