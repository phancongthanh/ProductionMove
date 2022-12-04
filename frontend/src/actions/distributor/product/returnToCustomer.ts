import backend from "../../../backend";

export default async function returnToCustomer(productId: number) {
    await backend.distributor.returnToCustomer(productId);
}