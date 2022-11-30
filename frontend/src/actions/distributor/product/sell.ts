import backend from "../../../backend";
import { Customer } from "../../../data/entities/Product";

export default async function sell(productId: number, customer: Customer) {
    await backend.products.sellProduct(productId, customer);
}