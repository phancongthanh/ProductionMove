import backend from "../../../backend";
import storage from "../../../storage";

export default async function add(fromId: number, toId: number) {
    const distributorId = storage.getUser()?.buildingId;
    if (!distributorId) return;
    await backend.distributions.addDistribution(distributorId, fromId, toId);
}