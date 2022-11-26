import login from "./login";
import logOut from "./logOut";

import create from "./create";
import haveLogged from "./haveLogged";

const user = {
    create,
    login,
    logOut,
    logged: haveLogged
}

export default user;