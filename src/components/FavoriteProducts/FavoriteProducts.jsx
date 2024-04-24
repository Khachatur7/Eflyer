import "../FavoriteProducts/FavoriteProducts.css";
import FavoriteCard from "../FavoriteCard";
import { useRef } from "react";

export default function FavoriteProducts({
  close,
  onClick,
  favoriteList,
  setFavoriteList,
  cartList,
  setCartList,
}) {
  // check if the user has a total price 
  let LastTotalPrice =
    JSON.parse(localStorage.getItem("TotalPrice")) ?? Number(0);
    // preparing new price
  let NewTotalPrice = useRef(0);

  function ClearList() {
    localStorage.removeItem("Favorite");
    setFavoriteList([]);
  }

  function AddAllToCart() {
    // creating new array to set new cartList 
    let changesArr = favoriteList
      .map((el) => {
        // check does cartList already have this prod or not
        if (!JSON.stringify(cartList).includes(el.id)) {
          // if he has we change user`s total price 
          NewTotalPrice.current = NewTotalPrice.current + el.total;
          // and push element into "changesArr"
          return el;
        }
      })
      // since the array may contain null, we remove them using the filter method
      .filter((el) => el != null);
    if (changesArr.length > 0) {
      localStorage.setItem(
        "Cart",
        JSON.stringify([...cartList, ...changesArr])
      );
      localStorage.setItem(
        "TotalPrice",
        JSON.stringify((+LastTotalPrice + NewTotalPrice.current).toFixed(2))
      );
      setCartList([...cartList, ...changesArr]);
    }
  }

  return (
    <div
      className="favorite_products"
      id={close ? "transform_shopping_cart" : ""}
    >
      <div className="cart_exit_module" onClick={onClick}></div>
      <div className="favorite_products_title">
        <span>Favorite Products</span>
      </div>
      <div className="card_lists">
        {favoriteList.length == 0 && (
          <>
            <h2 className="empty">You don't have any favorite products</h2>
          </>
        )}
        {favoriteList &&
          favoriteList.map((el) => {
            return (
              <FavoriteCard
                key={el.id + "fav"}
                product={el}
                favoriteList={favoriteList}
                setFavoriteList={setFavoriteList}
                cartList={cartList}
                setCartList={setCartList}
              />
            );
          })}
      </div>
      <div className="add_or_delete">
        {favoriteList.length != 0 && (
          <>
            <button className="add_cart_bttn" onClick={AddAllToCart}>
              Add All To Cart
            </button>
            <button className="clear_bttn" onClick={ClearList}>
              Clear List
            </button>
          </>
        )}
      </div>
    </div>
  );
}
