import backend from "../../../backend";

export default async function create(serviceCenterId: string, productId: number) {
    await backend.warranties.createWarrantyForCustomer(serviceCenterId, productId);
}