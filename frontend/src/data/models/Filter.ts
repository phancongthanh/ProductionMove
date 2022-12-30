import { ProductStatus } from "../enums/ProductStatus";

export interface Filter {
    search: string,
    productLines: Array<string>,
    status: Array<ProductStatus>
}