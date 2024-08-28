import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFetchLikes } from "../../Common/likes";
import Card from "../../Components/Сard/Card";
import Loading from "../../Components/Loading/Loading";
import backbtn from "../../assets/backbtn.svg";
import "./Favorite.scss";

export default function Favorite() {
  const navigate = useNavigate();
  const auth = getAuth();

  const userId = auth.currentUser?.uid;
  const { data: likes, isLoading, error } = useFetchLikes(userId);

  if (isLoading) return <Loading />;
  if (error) return navigate("*");

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
        likes.map((like, index) => <Card key={index} info={like.tourData} />)
      ) : (
        <p>You have no liked tours.</p>
      )}
    </div>
  );
}
