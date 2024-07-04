import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../Services/services";
import Loading from "../../Components/Loading/Loading";
import defaultPic from "../../assets/defaultProfilePic.svg";
import heart from "../../assets/heart.svg";
import briefcase from "../../assets/briefcase.svg";
import customerService from "../../assets/customerService.svg";
import signOutSvg from "../../assets/signOut.svg";
import backbtn from "../../assets/backbtn.svg";
import { RiSettings3Line } from "react-icons/ri";
import "./Profile.scss";
export default function Profile() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const user = auth.currentUser;
        if (user) {
          const data = await getUserData(user.uid);
          setUser(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [auth]);

  if(!user) return <Loading/>
  if(error) return navigate("*")

  return (
    <div className="account">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="backBtn"
      >
        <img src={backbtn} alt="back" />
      </button>
      <div className="account__container">
        <div className="account__pic">
          <img src={defaultPic} alt="account pic" />
        </div>
        <h1 className="account__title">Hello, {user.name}</h1>
        <span className="account__email">{user.email}</span>
        <nav className="account__nav">
          <div className="account__nav-item">
            <img src={heart} alt="heart" />
            <span>Favorites</span>
          </div>
          <div className="account__nav-item">
            <img src={briefcase} alt="briefcase" />
            <span>My trips</span>
          </div>
          <div className="account__nav-item">
            <img src={customerService} alt="customerService" />
            <span>Customer service</span>
          </div>
          <div className="account__nav-item">
            <RiSettings3Line color="#1995F5" />
            <span>Settings</span>
          </div>
          <div
            onClick={() => {
              signOut(auth);
              navigate("/auth");
            }}
            className="account__nav-item"
          >
            <img src={signOutSvg} alt="signOut" />
            <span>Sign Out</span>
          </div>
        </nav>
      </div>
    </div>
  );
}
