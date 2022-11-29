import backend from "../../../backend";
import ProductLine from "../../../data/entities/ProductLine";

export default async function create(productLine: ProductLine) {
    await backend.productLines.createProductLine(productLine);
}