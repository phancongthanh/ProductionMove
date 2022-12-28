import ProductAnalysis from "../data/models/ProductAnalysis";
import ProductStatistics, { DistributorProductStatisticsItem } from "../data/models/ProductStatistics";
import accounts from "./account";
import server from "./server";

export async function statusProductStatistics() : Promise<ProductStatistics<DistributorProductStatisticsItem>> {
    const url = server.baseUrl + "/Distributor/StatusProductStatistics";

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        }
    });

    if (response.ok) return await response.json();
    throw await response.json();   
}

export async function productSoldAnalysis() : Promise<ProductAnalysis> {
    const url = server.baseUrl + "/Distributor/ProductSoldAnalysis";

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        }
    });

    if (response.ok) return await response.json();
    throw await response.json();   
}

export async function returnToCustomer(productId: number) : Promise<void> {
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
    throw await response.json();   
}

export async function returnToFactory(productId: number) : Promise<void> {
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
    throw await response.json();   
}

const distributor = {
    statusProductStatistics,
    productSoldAnalysis,
    returnToCustomer,
    returnToFactory
}

export default distributor