import login from "./login";
import logOut from "./logOut";

import haveLogged, { isLogged } from "./haveLogged";

const user = {
    login,
    logOut,
    isLogged,
    logged: haveLogged
}

export default user;