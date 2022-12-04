import backend from "../../../backend";

async function forCustomer(serviceCenterId: string, productId: number) {
    await backend.warranties.createWarrantyForCustomer(serviceCenterId, productId);
}

async function forRecall(serviceCenterId: string, fromId: number|undefined, toId: number|undefined) {
    await backend.warranties.createWarrantyForRecall(serviceCenterId, fromId, toId);
}

const create = {
    forCustomer,
    forRecall
}

export default create