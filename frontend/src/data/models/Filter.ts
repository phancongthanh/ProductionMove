import { ProductStatus } from "../enums/ProductStatus";

export default interface Filter {
    productId: number|null|undefined,
    productLineIds: Array<string>,
    statuses: Array<ProductStatus>
}