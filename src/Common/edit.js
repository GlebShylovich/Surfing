import { deleteUser } from "firebase/auth";
export function updateUsername(editData, username, uid) {
  editData.mutate({ id: uid, field: "name", data: username });
}
export function deleteAccount(user){
  deleteUser(user)
};
