import { ProductStatus } from "../enums/ProductStatus";

export interface Filter {
    search: string,
    productLineIds: Array<string>,
    statuses: Array<ProductStatus>
}