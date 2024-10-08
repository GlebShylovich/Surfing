import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "../../Services/services";
import { setUser } from "../../Services/slices/user";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import data from "../../../tours.json";
import Card from "../../Components/Сard/Card";
import Filter from "../../Components/Filter/Filter";
import filterIcon from "../../assets/miniFilterIcon.svg";
import profileIcon from "../../assets/miniProfilePic.svg";
import "./Home.scss";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const [filterValue, setFilterValue] = useState("");
  const [tours, setTours] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (!filterValue) {
      setTours(data);
    } else {
      const filteredData = data.filter((item) =>
        item.tourName.toLowerCase().includes(filterValue.toLowerCase())
      );
      setTours(filteredData);
    }
  }, [filterValue]);

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
      {isFilterOpen && (
        <Filter setIsFilterOpen={setIsFilterOpen} setTours={setTours} />
      )}
      <header className="home__header">
        <h1 className="home__logo">surfvoyage</h1>
        <nav className="home__navigation">
          <li className="home__navigation-item">
            <a
              onClick={() => {
                setIsFilterOpen(true);
              }}
            >
              <img src={filterIcon} alt="filter" />
            </a>
          </li>
          <li className="home__navigation-item">
            <Link to="/profile">
              <img src={profileIcon} alt="profile" />
            </Link>
          </li>
        </nav>
      </header>
      <div className="home__search">
        <input
          value={filterValue}
          onChange={(e) => {
            setFilterValue(e.target.value);
          }}
          className="home__searchInput"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="home__container">
        <div className="home__catalog">
          {tours.map((item, index) => (
            <Card key={index} info={item}/>
          ))}
        </div>
      </div>
    </div>
  );
}
