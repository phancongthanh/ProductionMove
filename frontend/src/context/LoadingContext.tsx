import { createContext, useState, ReactNode, FC } from "react";

const LoadingContext = createContext<{
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  }>({ loading: true, setLoading: () => {} });
  
  type propTypes = {
    children: ReactNode;
  };
  export default LoadingContext;