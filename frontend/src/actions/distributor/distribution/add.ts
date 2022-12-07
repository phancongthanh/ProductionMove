import backend from "../../../backend";
import storage from "../../../storage";

export default async function add(factoryId: string, productLineId: string, fromId: number, toId: number) {
    const distributorId = storage.getUser()?.buildingId;
    if (!distributorId) return;
    await backend.distributions.addDistribution(factoryId, distributorId, productLineId, fromId, toId);
}