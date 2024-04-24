import { useState, useEffect, useRef } from "react";
import "../Header/Header.css";
import Cart from "../ImagesSVG/CartSVG";
import Favorite from "../ImagesSVG/FavoriteSVG";
import Search from "../ImagesSVG/SearchSVG";
import Categories from "../Categories";
import CartProducts from "../CartProducts/CartProducts";
import FavoriteProducts from "../FavoriteProducts/FavoriteProducts";

export default function Header({
  url,
  choosen,
  setChoosen,
  SetProdList,
  cartList,
  setCartList,
  favoriteList,
  setFavoriteList,
}) {
  let input_search = useRef("");
  // creating category for select tag
  let [categories, setCategories] = useState(false);
  let [menus, setMenus] = useState({
    showCart: true,
    leftMenu: true,
    showfavorite: true,
  });
  useEffect(() => {
    fetch(`${url}/categories`)
      .then((res) => res.json())
      .then((res) => setCategories(["All", ...res]));
  }, []);

  function OpenCloseLeftMenu() {
    return setMenus({ ...menus, leftMenu: !menus.leftMenu });
  }

  // function for search product by using input
  function SearchByTitle() {
    fetch(url)
      .then((res) => res.json())
      .then((res) =>
        SetProdList(
          res.filter((el) => el.title.includes(input_search.current.value))
        )
      );
  }
  function OpenCloseCart() {
    return setMenus({ ...menus, showCart: !menus.showCart });
  }
  function OpenCloseFav() {
    return setMenus({ ...menus, showfavorite: !menus.showfavorite });
  }

  return (
    <header className="header">
      <div
        className="left_menu"
        id={menus.leftMenu ? "transform_left_menu" : ""}
      >
        <div id="exit_left_menu" onClick={OpenCloseLeftMenu}>
        </div>
        <ul className="left_menu_bar">
          <li className="menu_bar_item">
            <a href="#">Best Sellers</a>
          </li>
          <li className="menu_bar_item">
            <a href="#">Gift Ideas</a>
          </li>
          <li className="menu_bar_item">
            <a href="#">New Releases</a>
          </li>
          <li className="menu_bar_item">
            <a href="#">Today's Deals</a>
          </li>
          <li className="menu_bar_item">
            <a href="#">Customer Service</a>
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="header_menu">
          <ul className="menu_bar">
            <li className="menu_bar_item">
              <a href="#">Best Sellers</a>
            </li>
            <li className="menu_bar_item">
              <a href="#">Gift Ideas</a>
            </li>
            <li className="menu_bar_item">
              <a href="#">New Releases</a>
            </li>
            <li className="menu_bar_item">
              <a href="#">Today's Deals</a>
            </li>
            <li className="menu_bar_item">
              <a href="#">Customer Service</a>
            </li>
          </ul>
        </div>
        <div className="header_body">
          <div className="logo">Eflyer</div>
          <div className="search_and_sort_menu">
            <div className="burger_menu" onClick={OpenCloseLeftMenu}>
              <div className="line" id="line1"></div>
              <div className="line" id="line2"></div>
              <div className="line" id="line3"></div>
            </div>
            {categories && (
              <>
                <Categories
                  className={"all_category"}
                  additionKey={"head"}
                  array={categories}
                  chooseVal={(ev) => setChoosen(ev.target.value)}
                  value={choosen}
                />
              </>
            )}
            <div className="search">
              <input
                ref={input_search}
                type="text"
                className="search_input"
                placeholder="Search product"
              />
              <button className="search_bttn" onClick={SearchByTitle}>
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
            <div className="cart" onClick={OpenCloseCart}>
              <Cart
              classname={"head_cart"}
                width={"30px"}
                height={"30px"}
                stroke={"#fff"}
                strokeWidth={"2px"}
                fill={"#fff"}
              />
              <span>cart</span>
            </div>
            <div className="favorite" onClick={OpenCloseFav}>
              <Favorite
                classname={"head_fav"}
                width={"30px"}
                height={"30px"}
                fill={"#fff"}
                stroke={"#fff"}
                strokeWidth={"1px"}
              />
              <span>favorite</span>
            </div>
          </div>
          <div className="header_body_content">
            <div className="header_body_text">
              <h3>GET START 
              YOUR FAVORITE SHOPING</h3>
            </div>
            <button className="buy">BUY NOW</button>
          </div>
        </div>
      </div>

      <CartProducts
        close={menus.showCart}
        cartList={cartList}
        setCartList={setCartList}
        onClick={OpenCloseCart}
      />

      <FavoriteProducts
        close={menus.showfavorite}
        onClick={OpenCloseFav}
        favoriteList={favoriteList}
        setFavoriteList={setFavoriteList}
        cartList={cartList}
        setCartList={setCartList}
      />
    </header>
  );
}
