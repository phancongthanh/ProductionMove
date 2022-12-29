import { createContext, useState, ReactNode, FC, useEffect } from "react";
import ProductLine from "../data/entities/ProductLine";

const ProductLinesContext = createContext<{
  productLines: ProductLine[] | null;
  setProductLines: React.Dispatch<React.SetStateAction<ProductLine[] | null>>
}>({ productLines: null, setProductLines: () => {} });

type propTypes = {
  children: ReactNode;
};

export const ProductLinesProvider: FC<propTypes> = (props) => {
  const { children } = props;
  const [productLines, setProductLines] = useState<ProductLine[] | null>(null);

  // useEffect(() => {
  //   const getData = async () => {
  //     setProductLines(await backend.productLines.getProductLines())
  //   }
  //   getData()
  // },[])
  
  return (
    <ProductLinesContext.Provider value={{ productLines, setProductLines }}>
      {children}
    </ProductLinesContext.Provider>
  );
};

export default ProductLinesContext;