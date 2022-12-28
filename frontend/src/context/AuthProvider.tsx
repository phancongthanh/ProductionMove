import { createContext, useState, ReactNode, FC } from "react";
import LoginResponse from "../data/models/LoginResponse";
import { RoleSchema } from "../data/enums/RoleSchema";
import storage from "../storage";
import user from "../actions/user";

function getAuth() : LoginResponse | null {
  if (!user.isLogged()) return null;
  const loginResponse = {
    user: storage.getUser(),
    refreshToken: storage.getRefreshToken(),
    accessToken: storage.getAccessToken()
  }
  if (!loginResponse.user || !loginResponse.refreshToken || !loginResponse.accessToken) return null;
  return loginResponse as LoginResponse;
}

const AuthContext = createContext<{
  auth: LoginResponse | null;
  setAuth: React.Dispatch<React.SetStateAction<LoginResponse | null>>
}>({ auth: null, setAuth: () => {} });

type propTypes = {
  children: ReactNode;
};

export const AuthProvider: FC<propTypes> = (props) => {
  const { children } = props;
  const [auth, setAuth] = useState<LoginResponse | null>(getAuth());
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
