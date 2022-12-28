import { createContext, useState, ReactNode, FC } from "react";
import LoginResponse from "../data/models/LoginResponse";
import { RoleSchema } from "../data/enums/RoleSchema";

const AuthContext = createContext<{
  auth: LoginResponse | null;
  setAuth: React.Dispatch<React.SetStateAction<LoginResponse | null>>
}>({ auth: null, setAuth: () => {} });

type propTypes = {
  children: ReactNode;
};

export const AuthProvider: FC<propTypes> = (props) => {
  const { children } = props;
  const [auth, setAuth] = useState<LoginResponse | null>(null);
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
