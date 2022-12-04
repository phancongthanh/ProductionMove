import backend from "../../../backend";

export default async function returnToFactory(productId: number) {
    await backend.distributor.returnToFactory(productId);
}