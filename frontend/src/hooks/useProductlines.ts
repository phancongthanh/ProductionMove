import { useContext } from "react"
import ProductLinesContext from "../context/ProductLinesProvider"

const useProductLines = () => {
    return useContext(ProductLinesContext)
}

export default useProductLines