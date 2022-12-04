import accounts from "./account";
import server from "./server";

export async function returnToCustomer(productId: string) : Promise<void> {
    const url = server.baseUrl + "/Distributor/ReturnToCustomer?productId=" + productId;

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        }
    });

    if (response.ok) return;
    throw new Error(await response.json());   
}

export async function returnToFactory(productId: string) : Promise<void> {
    const url = server.baseUrl + "/Distributor/ReturnToFactory?productId=" + productId;

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        }
    });

    if (response.ok) return;
    throw new Error(await response.json());   
}

const distributor = {
    returnToCustomer,
    returnToFactory
}

export default distributor