import { Customer } from "../data/entities/Product";
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

export async function sellProduct(productId: number, customer: Customer) : Promise<void> {
    const url = server.baseUrl + "/Products/Sell?productId=" + productId;

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        },
        body: JSON.stringify(customer)
    });
    if (response.ok) return;
    throw new Error(await response.json())
}

const products = {
    addProduct,
    sellProduct
}

export default products