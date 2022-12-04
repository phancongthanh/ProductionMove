import backend from "../../../backend";

export default async function start(productId: number) {
    await backend.warranties.startWarranty(productId);
}