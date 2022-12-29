import { useContext } from "react"
import BuildingsContext from '../context/BuildingsProvider';

const useBuildings = () => {
    return useContext(BuildingsContext)
}

export default useBuildings