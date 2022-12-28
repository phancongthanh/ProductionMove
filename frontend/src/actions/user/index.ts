import login from "./login";
import logOut from "./logOut";

import create from "./create";
import haveLogged, { isLogged } from "./haveLogged";

import get from "./get";
import gets from "./gets";
import change from "./change";

const user = {
    create,
    login,
    logOut,
    isLogged,
    logged: haveLogged,
    get,
    gets,
    change
}

export default user;