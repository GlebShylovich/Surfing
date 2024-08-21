import firebase from "firebase/compat/app";
import config from "../../config";
import "firebase/compat/database";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { remove, set, push, ref, get } from 'firebase/database';
const app = firebase.initializeApp(config);
const db = app.database();

export function useAddLikeData() {
  const queryClient = useQueryClient();

  return useMutation(
    async (likeData) => {
      const { userId, tourData } = likeData;
      const likesRef = ref(db, `likes/${userId}`);
      
      const snapshot = await get(likesRef);
      if (snapshot.exists()) {
        const likesData = snapshot.val();
        const existingLike = Object.entries(likesData).find(
          ([key, like]) => like.tourData.token === tourData.token
        );

        if (existingLike) {
          return existingLike[0];
        }
      }

      const newLikeKey = push(likesRef).key;
      const likeRef = ref(db, `likes/${userId}/${newLikeKey}`);
      await set(likeRef, {
        userId: userId,
        tourData: tourData,
      });

      return newLikeKey;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("likes");
      },
      onError: (error) => {
        console.error("Error adding like:", error.message);
      },
    }
  );
}



export function useFetchLikes(userId) {
  return useQuery(["likes", userId], async () => {
    const likesRef = ref(db, `likes/${userId}`);
    const snapshot = await get(likesRef);

    if (snapshot.exists()) {
      const likesData = snapshot.val();
      return Object.keys(likesData).map((likeKey) => ({
        likeKey,
        ...likesData[likeKey],
      }));
    } else {
      return [];
    }
  });
}

export function useRemoveLikeData() {
  const queryClient = useQueryClient();

  return useMutation(
      async ({ userId, likeKey }) => {
          const likeRef = ref(db, `likes/${userId}/${likeKey}`);
          await remove(likeRef);
      },
      {
          onSuccess: () => {
              queryClient.invalidateQueries("likes");
          },
      }
  );
}
