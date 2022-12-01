import accounts from "./account";
import server from "./server";

export async function createWarranty(serviceCenterId: string, productId: number) {
    const url = server.baseUrl + "/Warranties"
        + "?serviceCenterId=" + serviceCenterId
        + "&productId=" + productId;
    
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

const warranties = {
    createWarranty
}

export default warranties