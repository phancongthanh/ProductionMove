import backend from "../../../backend";

export default async function cancel(productId: number) {
    await backend.factory.cancelProduct(productId);
}