import accounts from "./account";
import server from "./server";

export async function createWarrantyForCustomer(serviceCenterId: string, productId: number) {
    const url = server.baseUrl + "/Warranties/Customer"
        + "?serviceCenterId=" + serviceCenterId
        + "&productId=" + productId;
    
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

export async function createWarrantyForRecall(serviceCenterId: string, fromProductId: number|undefined, toProductId: number|undefined) {
    let url = server.baseUrl + "/Warranties/Recall?serviceCenterId=" + serviceCenterId;
    if (fromProductId) url += "&fromProductId=" + fromProductId;
    if (toProductId) url += "&toProductId=" + toProductId;
    
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

export async function startWarranty(productId: number) {
    const url = server.baseUrl + "/Warranties/Start?productId=" + productId;
    
    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        }
    });
    if (response.ok) return;
    throw await response.json();
}

export async function completeWarranty(productId: number, isSuccessed: boolean) {
    const url = server.baseUrl + "/Warranties/Complete?productId=" + productId
        + "&isSuccessed=" + isSuccessed;
    
    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        }
    });
    if (response.ok) return;
    throw await response.json();
}

const warranties = {
    createWarrantyForCustomer,
    createWarrantyForRecall,
    startWarranty,
    completeWarranty
}

export default warranties