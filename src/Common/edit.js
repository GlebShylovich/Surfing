import { deleteUser } from "firebase/auth";
import { setUser } from "../Services/slices/user";
export function updateUsername(
  editData,
  username,
  uid,
  dispatch,
  setUpdateStatus,
  setIsSuccess
) {
  editData.mutate(
    { id: uid, field: "name", data: username },
    {
      onSuccess: () => {
        dispatch(setUser({ name: username }));
        setUpdateStatus(true);
        setIsSuccess(1);
      },
    },
    {
      onError: () => {
        setUpdateStatus(true);
        setIsSuccess(0);
      },
    }
  );
}
export function updateMail(
  editData,
  email,
  uid,
  dispatch,
  setUpdateStatus,
  setIsSuccess
) {
  editData.mutate(
    { id: uid, field: "email", data: email },
    {
      onSuccess: () => {
        dispatch(setUser({ email: email }));
        setUpdateStatus(true);
        setIsSuccess(1);
      },
    },
    {
      onError: () => {
        setUpdateStatus(true);
        setIsSuccess(0);
      },
    }
  );
}
export function deleteAccount(user) {
  deleteUser(user);
}
export function comparePasswords(password, repeat){
  return password === repeat;
}