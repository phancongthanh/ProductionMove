import backend from "../../backend";
import ProductLine from "../../data/entities/ProductLine";

export default async function get() : Promise<Array<ProductLine>> {
    return await backend.productLines.getProductLines();
}