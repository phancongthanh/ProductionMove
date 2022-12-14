import { RoleSchema } from "../../../../../data/enums/RoleSchema"

export type Building = {
    id: string,
    name: string,
    address: string
    type: RoleSchema
}

export type BuildingInfo = {
    name: string,
    address: string
    type: RoleSchema
}