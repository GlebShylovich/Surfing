import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "../../Services/services";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Services/slices/user";
import filterIcon from "../../assets/miniFilterIcon.svg";
import profileIcon from "../../assets/miniProfilePic.svg";
import "./Home.scss";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user.uid).then((userDatabase) => {
          dispatch(
            setUser({
              email: userDatabase.email,
              name: userDatabase.name,
              id: userDatabase.id,
            })
          );
          navigate("/");
        });
        return;
      }
      navigate("/auth");
    });
  }

  return (
    <div className="home">
      <div className="home__container">
        <header className="home__header">
          <h1 className="home__logo">surfvoyage</h1>
          <nav className="home__navigation">
            <li className="home__navigation-item">
              <a href="/">
                <img src={filterIcon} alt="filter" />
              </a>
            </li>
            <li className="home__navigation-item">
              <Link to="/profile">
                <img src={profileIcon} alt="filter" />
              </Link>
            </li>
          </nav>
        </header>
        <div className="home__search">
          <input className="home__searchInput" type="text" placeholder="Search"/>
        </div>
        <div className="home__catalog"></div>
      </div>
    </div>
  );
}
