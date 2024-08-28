import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import { storage } from "../../main";
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
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [avatar, setAvatar] = useState(defaultPic);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (user) {
          const storageRef = ref(storage, `avatars/${user.id}`);
          const url = await getDownloadURL(storageRef);
          setAvatar(url);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [user]);

  if (!user) return <Loading />;

  return (
    <div className="account">
      <button
        onClick={() => {
          navigate("/");
        }}
        className="backBtn"
      >
        <img src={backbtn} alt="back" />
      </button>
      <div className="account__container">
        <div className="account__pic">
          <img src={avatar} alt="account pic" />
        </div>
        <h1 className="account__title">Hello, {user.name}</h1>
        <span className="account__email">{user.email}</span>
        <nav className="account__nav">
          <div
            onClick={() => {
              navigate("/profile/favorite");
            }}
            className="account__nav-item"
          >
            <img src={heart} alt="heart" />
            <span>Favorites</span>
          </div>
          <div className="account__nav-item">
            <img src={customerService} alt="customerService" />
            <span>Customer service</span>
          </div>
          <div
            onClick={() => {
              navigate("/profile/settings");
            }}
            className="account__nav-item"
          >
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
