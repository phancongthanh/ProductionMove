import backend from "../../../backend";

export default async function add(distributorId: string, fromId: number, toId: number) {
    await backend.distributions.addDistribution(distributorId, fromId, toId);
}