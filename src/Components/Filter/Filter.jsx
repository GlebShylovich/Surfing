import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterParams } from "../../Services/slices/filter";
import Slider from "rc-slider";
import close from "../../assets/close.svg";
import data from "../../../tours.json";
import "rc-slider/assets/index.css";
import "./Filter.scss";

export default function Filter({ setIsFilterOpen, setTours }) {
  const [filterTags, setFilterTags] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  const dispatch = useDispatch();

  const prices = data.map((item) => item.pricePerNight.amount);
  const filterRangeData = useSelector((state) => state.filter);

  const initialRange = [filterRangeData.initialMinPrice, filterRangeData.initialMaxPrice];
  const userRange = [filterRangeData.minPrice, filterRangeData.maxPrice];

  const [initialRangeState, setInitialRangeState] = useState(initialRange);

  const [range, setRange] = useState(
    userRange[0] !== null && userRange[1] !== null ? userRange : initialRange
  );

  useEffect(() => {
    const initMinPrice = Math.min(...prices);
    const initMaxPrice = Math.max(...prices);
    dispatch(
      setFilterParams({
        initialMinPrice: initMinPrice,
        initialMaxPrice: initMaxPrice,
      })
    );
    if (userRange[0] !== null && userRange[1] !== null) {
      setRange(userRange);
    } else {
      setRange([initMinPrice, initMaxPrice]);
    }
    setInitialRangeState([initMinPrice, initMaxPrice]);
  }, []);

  useEffect(() => {
    const newData = data.filter((tour) => {
      const matchesTags = filterTags.length > 0
        ? filterTags.every((filterTag) =>
          tour.included.some((item) => item.toLowerCase()).includes(filterTag)
        )
        : true;

      const matchesPrice =
        tour.pricePerNight.amount >= range[0] &&
        tour.pricePerNight.amount <= range[1];

      return matchesTags && matchesPrice;
    });

    setFilteredData(newData);
  }, [filterTags, range]);

  const filterHandler = (event) => {
    if (event.target.checked) {
      setFilterTags([...filterTags, event.target.value.toLowerCase()]);
    } else {
      setFilterTags(
        filterTags.filter((filterTag) => filterTag !== event.target.value.toLowerCase())
      );
    }
  };

  const toursAmount = () => {
    return filteredData.length;
  };

  const handleRangeChange = (newRange) => {
    setRange(newRange);
    dispatch(setFilterParams({ minPrice: newRange[0], maxPrice: newRange[1] }));
  };

  const resetRange = () => {
    setRange(initialRangeState);
    dispatch(
      setFilterParams({ minPrice: initialRangeState[0], maxPrice: initialRangeState[1] })
    );
  };

  const resetCheckboxes = () => {
    setFilterTags([]);
  }

  const calculatePriceFrequency = (prices) => {
    const priceFrequency = {};
    prices.forEach((price) => {
      if (priceFrequency[price]) {
        priceFrequency[price] += 1;
      } else {
        priceFrequency[price] = 1;
      }
    });
    return priceFrequency;
  };

  const priceFrequency = calculatePriceFrequency(prices);

  const priceTabs = () => {
    return Object.keys(priceFrequency).map((price) => {
      const height = 15 * priceFrequency[price];
      const isInRange = price >= range[0] && price <= range[1];

      return (
        <div
          className="filter__bar"
          key={price}
          style={{
            height: `${height}px`,
            backgroundColor: isInRange
              ? "rgb(146, 207, 254)"
              : "rgb(227, 227, 227)",
          }}
        ></div>
      );
    });
  };

  return (
    <div className="filter">
      <div className="filter__container">
        <div className="filter__header">
          <button
            onClick={() => {
              setIsFilterOpen(false);
            }}
            className="filter__closeBtn"
          >
            <img src={close} alt="x" />
          </button>
          <h1 className="filter__title">Filters</h1>
        </div>
        <div className="filter__range">
          <div className="filter__range-info">
            <div className="filter__range-info-budget">
              Your budget (per night)
            </div>
            <div className="filter__range-info-budgetAmount">
              {range[0]}$ USD - {range[1]}$ USD
            </div>
          </div>
          <button onClick={resetRange} className="filter__range-reset">
            Reset
          </button>
        </div>
        <div className="filter__bars">{priceTabs()}</div>
        <Slider
          className="filter__slider"
          range
          min={initialRangeState[0]}
          max={initialRangeState[1]}
          value={range}
          onChange={handleRangeChange}
        />
        <div className="filter__checkboxes">
          <div className="filter__checkboxes-info">
            <div className="filter__checkboxes-title">Filters</div>
            <div className="filter__checkboxes-reset" onClick={resetCheckboxes}>
              Reset
            </div>
          </div>
          <div className="filter__checkboxes-container">
            <div className="filter__checkbox-item">
              <label>Personal surf lessons</label>
              <input value="personal surf lessons" onChange={filterHandler} type="checkbox" />
            </div>
            <div className="filter__checkbox-item">
              <label>Free Wi-Fi</label>
              <input value="free wi-fi" onChange={filterHandler} type="checkbox" />
            </div>
            <div className="filter__checkbox-item">
              <label>5 stars</label>
              <input value="5 stars" onChange={filterHandler} type="checkbox" />
            </div>
            <div className="filter__checkbox-item">
              <label>Excursions</label>
              <input value="excursions" onChange={filterHandler} type="checkbox" />
            </div>
            <div className="filter__checkbox-item">
              <label>Three meals per day</label>
              <input value="three meals per day" onChange={filterHandler} type="checkbox" />
            </div>
            <div className="filter__checkbox-item">
              <label>Equipment rental</label>
              <input value="equipment rental" onChange={filterHandler} type="checkbox" />
            </div>
            <div className="filter__checkbox-item">
              <label>First coastal</label>
              <input value="first coastal" onChange={filterHandler} type="checkbox" />
            </div>
            <div className="filter__checkbox-item">
              <label>Hotel</label>
              <input value="hotel" onChange={filterHandler} type="checkbox" />
            </div>
            <div className="filter__checkbox-item">
              <label>Camping</label>
              <input value="camping" onChange={filterHandler} type="checkbox" />
            </div>
          </div>
        </div>
      </div>

      <div className="filter__showResults">
        <div className="filter__showResults-amount">
          {toursAmount()} tours available
        </div>
        <div
          onClick={() => {
            setTours(filteredData);
            setIsFilterOpen(false);
          }}
          className="filter__showResults-btn"
        >
          Show results
        </div>
      </div>
    </div>
  );
}
