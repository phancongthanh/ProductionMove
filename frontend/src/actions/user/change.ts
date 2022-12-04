import backend from "../../backend";
import User from "../../data/models/User";

async function user(user: User) {
    await backend.users.changeUser(user)
}

async function password(password: string) {
    await backend.users.changePassword(password)
}

const change = {
    user,
    password
}

export default change
