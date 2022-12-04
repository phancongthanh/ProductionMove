import backend from "../../../backend";

export default async function recall(productLineId: string) {
    await backend.administrator.recallProduct(productLineId)
}