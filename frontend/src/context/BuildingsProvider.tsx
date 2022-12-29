import { createContext, useState, ReactNode, FC, useEffect } from "react";
import BuildingsModel from "../data/models/BuildingsModel";

const BuildingsContext = createContext<{
  buildings: BuildingsModel | null;
  setBuildings: React.Dispatch<React.SetStateAction<BuildingsModel | null>>
}>({ buildings: null, setBuildings: () => {} });


type propTypes = {
  children: ReactNode;
};

export const BuildingsProvider: FC<propTypes> = (props) => {
  const { children } = props;
  const [buildings, setBuildings] = useState<BuildingsModel | null>(null);

  // const getData = () => {
  //   setTimeout(async () => {
  //     setBuildings(await backend.buildings.getBuildings())
  //   }, 2000);
  // }

  // useEffect(() => {
  //   getData()
  // },[buildings])
  
  return (
    <BuildingsContext.Provider value={{ buildings, setBuildings }}>
      {children}
    </BuildingsContext.Provider>
  );
};

export default BuildingsContext;
