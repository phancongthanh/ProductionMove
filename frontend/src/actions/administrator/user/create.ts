import backend from "../../../backend";
import User from "../../../data/models/User";

export default async function create(user: User, password: string) {
    await backend.users.createUser(user, password);
}