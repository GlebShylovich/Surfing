import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getUserData } from "../../Services/services";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Services/slices/user";
import "./Home.scss";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  useEffect(() => {
    async function fetchUserData() {
      const user = auth.currentUser;
      try {
        if (user) {
          const userDatabase = await getUserData(user.uid);
          dispatch(
            setUser({
              email: userDatabase.email,
              name: userDatabase.name,
              id: userDatabase.id,
            })
          );
        } else {
          navigate('/auth')
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, []);

  return (
    <div className="home">
      <Link to="/profile">Account</Link>
    </div>
  );
}
