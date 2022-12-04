import accounts from "./account";
import server from "./server";

export async function cancelProduct(productId: number) : Promise<void> {
    const url = server.baseUrl + "/Factory/CancelProduct?productId=" + productId;

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

const factory = {
    cancelProduct
}

export default factory