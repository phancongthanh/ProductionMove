import backend from "../../backend";
import storage from "../../storage";

export default async function logOut() {
    await backend.accounts.logOut();
    storage.clear();
}