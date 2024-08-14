import firebase from "firebase/compat/app";
import config from "../../config";
import "firebase/compat/database";
import { useMutation, useQueryClient } from "react-query";
const app = firebase.initializeApp(config);
const db = app.database();

export function useAddLikeData() {
    const queryClient = useQueryClient();

    return useMutation(
        async (likeData) => {
            const { userId, tourData } = likeData;
            const newLikeRef = ref(db, `likes/${userId}`);
            const newLikeKey = push(newLikeRef).key;
            const likeRef = ref(db, `likes/${userId}/${newLikeKey}`);
            await set(likeRef, {
                userId: userId,
                tourData: tourData
            });
            return newLikeKey;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("likes");
            },
        }
    );
}