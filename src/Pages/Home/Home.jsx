import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./Home.scss";

export default function Home() {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/");
    } else {
      navigate("/auth");
    }
  }, [auth.currentUser]);

  return (
    <div className="home">
      <Link to="/profile">Account</Link>
    </div>
  );
}
