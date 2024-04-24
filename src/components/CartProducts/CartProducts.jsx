import { useRef, useState } from "react";
import "../CartProducts/CartProducts.css";
import CartCard from "../CartCard";

export default function CartProducts({
  close,
  onClick,
  cartList,
  setCartList,
}) {
  // checking our last total price for all products from cart list
  let LastTotalPrice = JSON.parse(localStorage.getItem("TotalPrice")) ?? "";
  // checking we need to do total price size smaller or not
  let totalFZ = LastTotalPrice.length.toString() >= 6 ? "small" : "";

  function ClearProdList() {
    localStorage.removeItem("Cart");
    localStorage.removeItem("TotalPrice");
    setCartList([]);
  }
  return (
    <div className="shopping_cart" id={close ? "transform_shopping_cart" : ""}>
      <div className="cart_exit_module" onClick={onClick}></div>
      <div className="shopping_cart_title">Shopping Cart</div>
     
      <div className="card_lists">
         {/* if user don`t have cartList we show him this*/}
      {cartList.length==0 && (
          <>
            <h2 className="empty">The basket is empty</h2>
          </>
        )}
        {/* if user have cartList we show him his products from cartList*/}
        {cartList && (
          <>
            {cartList.map((el) => {
              return (
                <CartCard
                  cartList={cartList}
                  product={el}
                  key={el.id + "card_cart"}
                  setCartList={setCartList}
                />
              );
            })}
          </>
        )}
        
      </div>
      
      <div className="cart_buy_or_delete">
         {/* if user have cartList we show him this also */}
        {!cartList.length==0 && (
          <>
            <div className="all_total_price" id={totalFZ}>
              <span className={"total_word"}>TOTAL: </span>
              <span>{LastTotalPrice}$</span>
            </div>
            <button className="cart_buy_bttn">BUY</button>
            <button className="cart_delete_bttn" onClick={ClearProdList}>
              CLEAR
            </button>
          </>
        )}
      </div>
    </div>
  );
}
