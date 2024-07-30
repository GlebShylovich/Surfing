import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import mapPin from "../../assets/mapPin.svg";
import "./Card.scss";

export default function Card({ info }) {
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
    <div className="card">
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
          <div className="card__favorite">
            <svg
              width="15.216797"
              height="14.471680"
              viewBox="0 0 15.2168 14.4717"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <defs />
              <path
                id="Vector"
                d="M7.6 11.83L2.9 14.47L3.95 9.18L0 5.52L5.35 4.89L7.6 0L9.86 4.89L15.21 5.52L11.25 9.18L12.31 14.47L7.6 11.83Z"
                fill="#FFFFFF"
                fill-opacity="1.000000"
                fill-rule="nonzero"
              />
            </svg>
          </div>
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
