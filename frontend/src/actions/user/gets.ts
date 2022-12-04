import backend from "../../backend";

export default async function gets() {
    return await backend.users.getUsers();
}