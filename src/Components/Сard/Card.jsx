import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { setModal } from "../../Services/slices/modal";
import mapPin from "../../assets/mapPin.svg";
import "./Card.scss";

export default function Card({ info }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [activeBtn, setActiveBtn] = useState(0);

  function handleNext() {
    if (count === info.images.length - 1) {
      setCount(0);
      return;
    }
    setCount((prevCount) => prevCount + 1);
    setActiveBtn((prevIndex) => prevIndex + 1);
  }

  function handlePrev() {
    if (count === 0) {
      setCount(info.images.length - 1);
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

  return (
    <div
      className="card"
      onClick={() => {
        dispatch(setModal(info));
        navigate(`/${info.token}`);
      }}
    >
      <div className="card__carousel" {...handlers}>
        <img src={info.images[count]} alt="" />
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
      <div className="card__info">
        <div>
          <h1 className="card__name">{info.tourName}</h1>
        </div>
        <div>
          <div className="card__location">
            <img src={mapPin} alt="mapPin" />
            {info.destination}
          </div>
          <div className="card__price">
            {info.pricePerNight.amount} {info.pricePerNight.currency}
          </div>
        </div>
      </div>
    </div>
  );
}
