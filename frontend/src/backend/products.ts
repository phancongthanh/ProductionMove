import Product, { Customer } from "../data/entities/Product";
import PaginatedList from "../data/models/PaginatedList";
import accounts from "./account";
import server from "./server"

export async function getProducts(pageNumber: number, pageSize: number) : Promise<PaginatedList<Product>> {
    const url = server.baseUrl + "/Products"
        + "?pageNumber=" + pageNumber
        + "&pageSize=" + pageSize;

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'GET',
        headers: accessToken ? {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        } : {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) return await response.json();
    throw await response.json()
}

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
    throw await response.json()
}

export async function sellProduct(productId: number, customer: Customer) : Promise<void> {
    const url = server.baseUrl + "/Products/Sell?productId=" + productId;

    const accessToken = await accounts.getAccessToken();
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        },
        body: JSON.stringify(customer)
    });
    if (response.ok) return;
    throw await response.json()
}

const products = {
    getProducts,
    addProduct,
    sellProduct
}

export default products