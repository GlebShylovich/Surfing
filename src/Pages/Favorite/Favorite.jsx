import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchLikes, useRemoveLikeData } from "../../Common/likes";
import mapPin from "../../assets/mapPin.svg";
import backbtn from "../../assets/backbtn.svg";
import "./Favorite.scss";

export default function Favorite() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const { data: likes, isLoading, error } = useFetchLikes(userId);
  const removeLikeData = useRemoveLikeData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading likes. Please try again later.</div>;

  const handleRemoveLike = (likeKey) => {
    removeLikeData.mutate({ userId, likeKey });
  };

  return (
    <div className="favorite">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="goBackBtn"
      >
        <img src={backbtn} alt="" />
      </button>
      <h2>My Liked Tours</h2>
      {likes.length > 0 ? (
        likes.map((like) => (
          <div className="likedTour" key={like.likeKey}>
            <h3>{like.tourData.tourName}</h3>
            <span>
              {like.tourData.pricePerNight.amount}
              {like.tourData.pricePerNight.currency}
            </span>
            <div className="likeTour__location">
              <img src={mapPin} alt="mapPin" />
              {like.tourData.destination}
            </div>
            <button
              onClick={() => handleRemoveLike(like.likeKey)}
              disabled={removeLikeData.isLoading}
            >
              {removeLikeData.isLoading ? "Removing..." : "Remove Like"}
            </button>
          </div>
        ))
      ) : (
        <p>You have no liked tours.</p>
      )}
    </div>
  );
}
