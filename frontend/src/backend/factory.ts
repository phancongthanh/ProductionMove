import ProductAnalysis from "../data/models/ProductAnalysis";
import ProductCanceledStatisticsData from "../data/models/ProductCanceledStatisticsData";
import ProductStatistics, { FactoryProductStatisticsItem } from "../data/models/ProductStatistics";
import accounts from "./account";
import server from "./server";

export async function statusProductStatistics() : Promise<ProductStatistics<FactoryProductStatisticsItem>> {
    const url = server.baseUrl + "/Factory/StatusProductStatistics";

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

export async function productCanceledRateStatistics() : Promise<ProductCanceledStatisticsData> {
    const url = server.baseUrl + "/Factory/ProductCanceledRateStatistics";

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

export async function productExportAnalysis() : Promise<ProductStatistics<ProductAnalysis>> {
    const url = server.baseUrl + "/Factory/ProductExportAnalysis";

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
    throw await response.json();   
}

const factory = {
    statusProductStatistics,
    productCanceledRateStatistics,
    productExportAnalysis,
    cancelProduct
}

export default factory