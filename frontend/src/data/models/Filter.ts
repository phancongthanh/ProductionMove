import { ProductStatus } from "../enums/ProductStatus";

export interface Filter {
    productId: number|null|undefined,
    productLineIds: Array<string>|null|undefined,
    statuses: Array<ProductStatus>|null|undefined
}