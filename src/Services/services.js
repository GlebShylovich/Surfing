import firebase from "firebase/compat/app";
import config from "../../config";
import "firebase/compat/database";
import { useMutation, useQueryClient } from "react-query";
const app = firebase.initializeApp(config);
const db = app.database();
export function useAddData() {
  const queryClient = useQueryClient();
  return useMutation(
    async (newData) => {
      const { id } = newData;
      const ref = db.ref(`users/${id}`);
      await ref.set(newData);
      return id;
    },
    {
      onSuccess: (userKey) => {
        queryClient.invalidateQueries("users");
      },
    }
  );
}

export function useEditData() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, field, updateData }) => {
      await db.ref(`users/${id}/${field}`).set(updateData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
}
export async function getUserData(uid) {
  const snapshot = await db.ref(`users/${uid}`).once("value");
  return snapshot.val();
}
export async function checkEmailExists(email) {
  const snapshot = await db
    .ref("users")
    .orderByChild("email")
    .equalTo(email)
    .once("value");
  return snapshot.exists();
}
