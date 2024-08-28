import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearModal } from "../../Services/slices/modal";
import { useSwipeable } from "react-swipeable";
import {
  useAddLikeData,
  useFetchLikes,
  useRemoveLikeData,
} from "../../Common/likes";
import Map from "../../Components/Map/Map";
import { DatePicker } from "antd";
import mapPin from "../../assets/mapPin.svg";
import secondBackBtn from "../../assets/secondBackBtn.svg";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import "./Tour.scss";

export default function Tour() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const data = useSelector((state) => state.modal.modalData);
  const { data: likes, isLoading } = useFetchLikes(userId);

  const [count, setCount] = useState(0);
  const [activeBtn, setActiveBtn] = useState(0);
  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");
  const [price, setPrice] = useState("");
  const [dateError, setDateError] = useState(false);
  const [currentDateError, setCurrentDateError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeKey, setLikeKey] = useState(null);

  const addLikeMutation = useAddLikeData();
  const removeLikeMutation = useRemoveLikeData();

  useEffect(() => {
    if (!isLoading && likes && data && data.token) {
      const likedTour = likes.find(
        (like) => like.tourData?.token === data.token
      );
      if (likedTour) {
        setIsLiked(true);
        setLikeKey(likedTour.likeKey);
      } else {
        setIsLiked(false);
        setLikeKey(null);
      }
    }
  }, [likes, isLoading, data]);

  const handleLikeClick = async () => {
    if (isLiked) {
      await removeLikeMutation.mutateAsync({ userId, likeKey });
      setIsLiked(false);
      setLikeKey(null);
    } else {
      const newLikeKey = await addLikeMutation.mutateAsync({
        userId,
        tourData: data,
      });
      setIsLiked(true);
      setLikeKey(newLikeKey);
    }
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    if (firstDate && new Date(firstDate) < new Date(currentDate)) {
      setCurrentDateError(true);
      setDateError(false);
      setPrice(false);
      setFirstDate("");
      return;
    }
    if (firstDate && secondDate) {
      if (new Date(secondDate) >= new Date(firstDate)) {
        setDateError(false);
        setCurrentDateError(false);
        setPrice(
          data.pricePerNight.amount * amountOfDays(firstDate, secondDate)
        );
      } else {
        setDateError(true);
        setCurrentDateError(false);
        setSecondDate("");
        setPrice(false);
      }
    } else {
      setPrice(false);
    }
  }, [firstDate, secondDate]);

  function handleNext() {
    if (count === data.images.length - 1) {
      setCount(0);
      return;
    }
    setCount((prevCount) => prevCount + 1);
    setActiveBtn((prevIndex) => prevIndex + 1);
  }

  function handlePrev() {
    if (count === 0) {
      setCount(data.images.length - 1);
      return;
    }
    setCount((prevCount) => prevCount - 1);
    setActiveBtn((prevIndex) => prevIndex - 1);
  }

  function handleCarouselClick(index) {
    setCount(index);
    setActiveBtn(index);
  }

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
  });

  function amountOfDays(first, second) {
    const firstDate = new Date(first);
    const secondDate = new Date(second);
    const timeDifference = secondDate - firstDate;
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference;
  }

  return (
    <div className="tour">
      <div className="tour__navPanel">
        <button
          onClick={() => {
            dispatch(clearModal());
            navigate("/");
          }}
          className="tour__goBackBtn"
        >
          <img src={secondBackBtn} alt="" />
        </button>
        <div className="tour__navPanel-actions">
          <button className="tour__likeBtn" onClick={handleLikeClick}>
            {isLiked ? <FaHeart /> : <FaRegHeart/>}
          </button>
        </div>
      </div>
      <div className="tour__carousel" {...handlers}>
        <img src={data.images[count]} alt="" />
        <div className="carousel__buttons">
          <button
            onClick={() => handleCarouselClick(0)}
            id="firstSliderBtn"
            className={activeBtn === 0 ? "carouselBtn--active" : "carouselBtn"}
          ></button>
          <button
            onClick={() => handleCarouselClick(1)}
            id="secondSliderBtn"
            className={activeBtn === 1 ? "carouselBtn--active" : "carouselBtn"}
          ></button>
          <button
            onClick={() => handleCarouselClick(2)}
            id="thirdSliderBtn"
            className={activeBtn === 2 ? "carouselBtn--active" : "carouselBtn"}
          ></button>
          <button
            onClick={() => handleCarouselClick(3)}
            id="fourthSliderBtn"
            className={activeBtn === 3 ? "carouselBtn--active" : "carouselBtn"}
          ></button>
        </div>
      </div>
      <div className="tour__included">
        {Object.entries(data.included).map((item, index) => (
          <div key={index} className="tour__included-item">
            <div className="tour__included-item-img">
              <img src={item[1][1]} alt="img" />
            </div>
            <p>{item[1][0]}</p>
          </div>
        ))}
      </div>
      <div className="tour__naming">
        <h1 className="tour__name">{data.tourName}</h1>
      </div>
      <div className="tour__calendar">
        <div className="tour__datePicker">
          <div className="tour__calendar__arrival">
            <p>Arrival</p>
            <DatePicker
              style={{
                border: "none",
                outline: "none",
                color: "#1995F5",
                padding: "5px",
              }}
              selected={firstDate}
              onChange={(date) =>
                setFirstDate(new Date(date).toISOString().split("T")[0])
              }
            />
          </div>
          <div className="tour__calendar__departure">
            <p>Departure</p>
            <DatePicker
              style={{
                border: "none",
                outline: "none",
                color: "#1995F5",
                padding: "5px",
                height: "auto",
                width: "auto",
              }}
              selected={secondDate}
              onChange={(date) =>
                setSecondDate(new Date(date).toISOString().split("T")[0])
              }
            />
          </div>
        </div>
        {!currentDateError && !dateError && price && (
          <>
            <div className="tour__price">USD {price}$</div>
            <div className="tour__price-subtitle">
              Price for {amountOfDays(firstDate, secondDate)}{" "}
              {amountOfDays(firstDate, secondDate) > 1 ? "nights" : "night"}
            </div>
          </>
        )}
      </div>

      {dateError ? (
        <p className="tour__dateError">
          Departure date can't be earlier than arrival
        </p>
      ) : currentDateError ? (
        <p className="tour__dateError">
          The arrival date cannot be earlier than tomorrow.
        </p>
      ) : null}
      <div className="tour__map">
        <Map location={data.mapLocation} />
      </div>
      <div className="tour__location">
        <img src={mapPin} alt="Pin" />
        <span>{data.destination}</span>
      </div>
      <div className="tour__description">
        <h2 className="tour__description-title">Description</h2>
        <p className="tour__description-text">{data.description}</p>
      </div>
      <div className="tour__activities">
        <h2 className="tour__activities-title">Activities</h2>
        {data.activities.map((item, index) => (
          <p key={index} className="tour__activities-text">
            <span>{item.name}: </span>
            {item.description}
          </p>
        ))}
      </div>
    </div>
  );
}
