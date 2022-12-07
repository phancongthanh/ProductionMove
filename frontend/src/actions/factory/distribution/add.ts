import backend from "../../../backend";
import storage from "../../../storage";

export default async function add(distributorId: string, productLineId: string, fromId: number, toId: number) {
    const factoryId = storage.getUser()?.buildingId;
    if (!factoryId) return;
    await backend.distributions.addDistribution(factoryId, distributorId, productLineId, fromId, toId);
}