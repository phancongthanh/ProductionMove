import ProductLine, { ProductLineInfo } from "../data/entities/ProductLine";
import accounts from "./account";
import server from "./server";

export async function getProductLines() : Promise<Array<ProductLine>> {
    const url = server.baseUrl + "/ProductLines";

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        }
    });

    if (response.ok) return response.json();
    throw response.status;
}

export async function createProductLine(productLine: ProductLine) : Promise<void> {
    const url = server.baseUrl + "/ProductLines";

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        },
        body: JSON.stringify(productLine)
    });

    if (response.ok) return;
    throw await response.json();
}

export async function updateProductLine(productLineId: string, describes: Array<ProductLineInfo>) : Promise<void> {
    const url = server.baseUrl + "/ProductLines?productLineId=" + productLineId;

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        },
        body: JSON.stringify(describes)
    });

    if (response.ok) return;
    throw await response.json();
}

const productLines = {
    getProductLines,
    createProductLine,
    updateProductLine
}

export default productLines