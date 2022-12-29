import backend from "../../backend";
import User from "../../data/models/User";

async function user(user: User) {
    await backend.users.changeUser(user)
}

async function password(userId: string, password: string) {
    await backend.users.changePassword(userId, password)
}

const change = {
    user,
    password
}

export default change
