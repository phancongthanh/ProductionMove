import backend from "../../../backend";
import { ProductLineInfo } from "../../../data/entities/ProductLine";

export default async function update(id: string, describes: Array<ProductLineInfo>) {
    await backend.productLines.updateProductLine(id, describes);
}

/*
export default async function update(name: string, describes: Array<ProductLineInfo>) {
    //await backend.productLines.updateProductLine(productLineId, describes);
}
*/