import { useState } from "react";
import Categories from "../Categories";

export default function FilterForMobile({
  rate,
  price,
  categories,
  forFilter,
  FilterOnOff,
  choosen,
  setChoosen,
  FilterByRate,
  rate_arr,
  FilterByPrice,
  price_arr,
}) {
  let [show, setShow] = useState(forFilter.filter ? true : false);

  return (
    <div
      className={`mobile_filter_menu ${show ? "move_to_right" : ""}`}
      id={forFilter.filter ? "mob_f_show" : ""}
    >
      <button className="exit_mob_filter" onClick={FilterOnOff}>
        exit
      </button>
      <button
        className={`show_result ${show && forFilter.filter ? "show_bttn" : ""}`}
        onClick={() => setShow(!show)}
      >
        show
      </button>
      {categories && (
        <>
          <Categories
            className={"mob_categories"}
            array={categories}
            chooseVal={(ev) => setChoosen(ev.target.value)}
            value={choosen}
          />
        </>
      )}{" "}
      <div className="mob_filter_block">
        <span>Filter by rate</span>
        <div className="filter_rate" id="by_rate">
          <div className="min">
            {" "}
            <label htmlFor="min_rate">from</label>
            <select
              id="min_rate"
              value={rate.minRate}
              onChange={(e) => FilterByRate(e.target.value, rate.maxRate)}
            >
              {rate_arr.map((el) => {
                if (el < 5) {
                  return (
                    <option
                      className="filter_option"
                      key={Math.random(el + 100)}
                      value={el}
                    >
                      {el}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="max">
            <label htmlFor="max_rate">to</label>
            <select
              id="max_rate"
              value={rate.maxRate}
              onChange={(e) => FilterByRate(rate.minRate, e.target.value)}
            >
              {rate_arr.map((el) => {
                if (el > 0) {
                  return (
                    <option
                      className="filter_option"
                      key={Math.random(el + 100)}
                      value={el}
                    >
                      {el}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        </div>
        <span
          className={rate.error ? "filter_error show_error" : "filter_error"}
        >
          the minimum value cannot be greater than or equal to the maximum
        </span>{" "}
      </div>
      <div className="mob_filter_block" id={forFilter.opacity}>
        <span>Filter by price</span>
        <div className="filter_price" id="by_price">
          <div className="min">
            {" "}
            <label htmlFor="min_price">from</label>
            <select
              id="min_price"
              value={price.minPrice}
              onChange={(e) => FilterByPrice(e.target.value, price.maxPrice)}
            >
              {price_arr.map((el) => {
                if (el < 1000) {
                  return (
                    <option
                      className="filter_option"
                      key={Math.random(el + 100)}
                      value={el}
                    >
                      {el}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="max">
            <label htmlFor="max_price">to</label>
            <select
              id="max_price"
              value={price.maxPrice}
              onChange={(e) => FilterByPrice(price.minPrice, e.target.value)}
            >
              {price_arr.map((el) => {
                if (el > 0 || el == "1000+") {
                  return (
                    <option
                      className="filter_option"
                      key={Math.random(el + 100)}
                      value={el}
                    >
                      {el}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        </div>
        <span
          className={price.error ? "filter_error show_error" : "filter_error"}
        >
          the minimum value cannot be greater than or equal to the maximum
        </span>
      </div>
    </div>
  );
}
