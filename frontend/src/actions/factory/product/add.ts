import backend from "../../../backend";

export default async function add(productLineId: string, fromId: number, toId: number) {
    await backend.products.addProduct(productLineId, fromId, toId);
}