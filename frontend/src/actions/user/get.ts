import backend from "../../backend";

export default async function get(userId: string) {
    return await backend.users.getUser(userId);
}