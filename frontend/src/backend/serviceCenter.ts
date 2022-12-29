import ProductStatistics, { ServiceCenterProductStatisticsItem } from "../data/models/ProductStatistics";
import accounts from "./account";
import server from "./server";

export async function statusProductStatistics() : Promise<ProductStatistics<ServiceCenterProductStatisticsItem>> {
    const url = server.baseUrl + "/ServiceCenter/StatusProductStatistics";

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

const serviceCenter = {
    statusProductStatistics
}

export default serviceCenter