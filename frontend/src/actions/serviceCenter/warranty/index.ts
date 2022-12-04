import create from "./create"
import start from "./start"
import complete from "./complete"

const warranty = {
    create,
    start,
    complete,
    returnToDistributor: (productId: number) => complete(productId, true),
    returnToFactory: (productId: number) => complete(productId, false)
}

export default warranty