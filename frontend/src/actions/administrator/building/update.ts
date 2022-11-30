import backend from "../../../backend";
import Building from "../../../data/entities/Building";
import { RoleSchema } from "../../../data/enums/RoleSchema";

export async function building(type: string, building: Building) {
    await backend.buildings.updateBuilding(type, building)
}

export async function factory(building: Building) {
    await backend.buildings.updateBuilding(RoleSchema.Factory, building)
}

export async function distributor(building: Building) {
    await backend.buildings.updateBuilding(RoleSchema.Distributor, building)
}

export async function serviceCenter(building: Building) {
    await backend.buildings.updateBuilding(RoleSchema.ServiceCenter, building)
}

const update = {
    building,
    factory,
    distributor,
    serviceCenter
}

export default update