import backend from "../../../backend"

export default async function remove(userId: string) {
    await backend.users.deleteUser(userId);
}