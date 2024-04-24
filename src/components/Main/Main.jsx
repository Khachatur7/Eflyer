import { useEffect, useRef, useState } from "react";
import "../Main/Main.css";
import Search from "../ImagesSVG/SearchSVG";
import Product from "../Product/Product";
import Categories from "../Categories";
import Filter from "../ImagesSVG/FilterSVG";
import MoreInfo from "../MoreInfo/MoreInfo";
import FilterForMobile from "../FilterForMobile/FilterForMobile";

export default function Main({
  prodList,
  choosen,
  setChoosen,
  url,
  SetProdList,
  favoriteList,
  setFavoriteList,
  cartList,
  setCartList,
}) {

  // creating rate and price arrays for select`s options
  let rate_arr = [0, 1, 2, 3, 4, 5];
  let price_arr = [0, 10, 50, 100, 500, "1000+"];
  // creating states for check we need additional filter`s settings or not
  let [forFilter, setForFilter] = useState({
    filter: false,
    searchAnim: undefined,
    opacity: undefined,
    selectAnim: undefined,
  });
  let input_search = useRef("");
    // creating category for select tag
  let [categories, setCategories] = useState(false);
  // module window opening and closing state for more product information
  let [infoModule, setInfoMofule] = useState(false);
  // creating states for filter with rate our prod list data from server
  let [rate, setRate] = useState({
    minRate: 0,
    maxRate: 5,
    error: false,
  });
  // creating states for filter with price our prod list data from server
  let [price, setPrice] = useState({
    minPrice: 0,
    maxPrice: "1000+",
    error: false,
  });

  function FilterByRate(min, max) {
    if (min < max) {
      setRate({
        minRate: min,
        maxRate: max,
        error: false,
      });
      fetch(url)
        .then((res) => res.json())
        .then((res) =>
          SetProdList(
            res.filter((el) => el.rating.rate > min && el.rating.rate < max)
          )
        );
    } else {
      setRate({
        ...rate,
        error: true,
      });
    }
  }

  function FilterByPrice(min, max) {
    if (max == "1000+") {
      setPrice({
        minPrice: min,
        maxPrice: max,
        error: false,
      });
      fetch(url)
        .then((res) => res.json())
        .then((res) => SetProdList(res.filter((el) => el.price > min)));
    } else if (min < max) {
      setPrice({
        minPrice: min,
        maxPrice: max,
        error: false,
      });
      fetch(url)
        .then((res) => res.json())
        .then((res) =>
          SetProdList(res.filter((el) => el.price > min && el.price < max))
        );
    } else {
      setPrice({
        ...price,
        error: true,
      });
    }
  }

  useEffect(() => {
    fetch(`${url}/categories`)
      .then((res) => res.json())
      .then((res) => setCategories(["All", ...res]));
  }, []);

  function SearchByTitle() {
    fetch(url)
      .then((res) => res.json())
      .then((res) =>
        SetProdList(
          res.filter((el) => el.title.includes(input_search.current.value))
        )
      );
  }

  function FilterOnOff() {
    setForFilter({
      filter: !forFilter.filter,
      searchAnim: !forFilter.filter ? "move_to_left" : "return_to_place",
      opacity: !forFilter.filter ? "show" : "hide",
      selectAnim: !forFilter.filter
        ? "sel_move_to_left"
        : "sel_return_to_place",
    });
    return ReturnDefaultValue();
  }
// returning default data from the server after closing the filter
  function ReturnDefaultValue() {
    if (forFilter.filter) {
      setRate({
        minRate: 0,
        maxRate: 5,
        error: false,
      });
      setPrice({
        minPrice: 0,
        maxPrice: "1000+",
        error: false,
      });
      fetch(url)
        .then((res) => res.json())
        .then((res) => SetProdList(res));
    }
  }

  return (
    <main className="main">
     <FilterForMobile
     forFilter={forFilter}
     FilterOnOff={FilterOnOff}
     rate={rate}
     rate_arr={rate_arr}
     price={price}
     price_arr={price_arr}
     categories={categories}
     choosen={choosen}
     setChoosen={setChoosen}
     FilterByPrice={FilterByPrice}
     FilterByRate={FilterByRate}
     />
      <div className="container">
        {" "}
        <div className="main_head">
          {categories && (
            <>
              <Categories
                className={"categories"}
                id={forFilter.selectAnim}
                array={categories}
                chooseVal={(ev) => setChoosen(ev.target.value)}
                value={choosen}
              />
            </>
          )}
          <div
            className="main_search"
            id={forFilter.searchAnim && forFilter.searchAnim}
          >
            <input
              ref={input_search}
              type="text"
              id="main_search"
              placeholder="Search product"
            />
            <button id="main_search_bttn" onClick={SearchByTitle}>
              {" "}
              <Search
                width={"25px"}
                height={"25px"}
                stroke={"#fff"}
                strokeWidth={"3px"}
                fill={"none"}
              />{" "}
            </button>
          </div>
          <div className="filter_block" id={forFilter.opacity}>
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
              className={
                rate.error ? "filter_error show_error" : "filter_error"
              }
            >
              the minimum value cannot be greater than or equal to the maximum
            </span>{" "}
          </div>
          <div className="filter_block" id={forFilter.opacity}>
            <span>Filter by price</span>
            <div className="filter_price" id="by_price">
              <div className="min">
                {" "}
                <label htmlFor="min_price">from</label>
                <select
                  id="min_price"
                  value={price.minPrice}
                  onChange={(e) =>
                    FilterByPrice(e.target.value, price.maxPrice)
                  }
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
                  onChange={(e) =>
                    FilterByPrice(price.minPrice, e.target.value)
                  }
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
              className={
                price.error ? "filter_error show_error" : "filter_error"
              }
            >
              the minimum value cannot be greater than or equal to the maximum
            </span>
          </div>
          <button
            className="filter_bttn"
            id={forFilter.filter ? "cancel" : "filter"}
            onClick={FilterOnOff}
          >
            <Filter />
          </button>
        </div>
        <div className="products" id="products">
          {Boolean(prodList) == false && (
            <>
              <h3>Loading...</h3>
            </>
          )}

          {prodList && prodList != [] && (
            <>
              {prodList.map((el) => {
                return (
                  <Product
                    tools={true}
                    key={el.id}
                    product={el}
                    openModule={() => setInfoMofule(el)}
                    favoriteList={favoriteList}
                    setFavoriteList={setFavoriteList}
                    cartList={cartList}
                    setCartList={setCartList}
                  />
                );
              })}
            </>
          )}
          {prodList.length < 1 && (
            <>
              <h1>Not found</h1>
            </>
          )}
        </div>
      </div>
      {infoModule && (
        <MoreInfo
          product={infoModule}
          closeModule={() => setInfoMofule(false)}
          cartList={cartList}
          setCartList={setCartList}
        />
      )}
    </main>
  );
}
