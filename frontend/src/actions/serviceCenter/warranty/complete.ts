import backend from "../../../backend";

export default async function complete(productId: number, isSuccessed: boolean) {
    await backend.warranties.completeWarranty(productId, isSuccessed)
}