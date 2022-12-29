import accounts from "./account";
import server from "./server";

export async function recallProduct(productLineId: string) : Promise<void> {
    const url = server.baseUrl + "/Administrator/RecallProduct?productLineId=" + productLineId;

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

const administrator = {
    recallProduct
}

export default administrator