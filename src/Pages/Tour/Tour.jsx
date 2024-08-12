import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearModal } from "../../Services/slices/modal";
import { useSwipeable } from "react-swipeable";
import Map from "../../Components/Map/Map";
import { DatePicker } from "antd";
import mapPin from "../../assets/mapPin.svg";
import secondBackBtn from "../../assets/secondBackBtn.svg";
import shareBtn from "../../assets/shareBtn.svg";
import likeBtn from "../../assets/likeBtn.svg";
import "./Tour.scss";

export default function Tour() {
  const [count, setCount] = useState(0);
  const [activeBtn, setActiveBtn] = useState(0);
  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");
  const [price, setPrice] = useState("");
  const [dateError, setDateError] = useState(false);
  const [currentDateError, setCurrentDateError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.modal.modalData);
  console.log(data);

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, []);

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
          <button className="tour__shareBtn">
            <img src={shareBtn} alt="" />
          </button>
          <button className="tour__likeBtn">
            <img src={likeBtn} alt="" />
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
      <div className="tour__included"></div>
      <div className="tour__naming">
        <h1 className="tour__name">{data.tourName}</h1>
        <div className="tour__favorite">
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
    </div>
  );
}
