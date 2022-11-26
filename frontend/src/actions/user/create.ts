import User from "../../data/models/User";

import backend from "../../backend";

export default async function create(user: User) {
    await backend.accounts.signUp(user);
}