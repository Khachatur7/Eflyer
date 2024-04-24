import { useRef, useState } from "react";

export default function CartCard({ cartList, setCartList, product }) {
  let prodCount = useRef(product.count);
  let [total, setTotal] = useState(+product.total);
  let AllProductPrice = +JSON.parse(localStorage.getItem("TotalPrice"));

  function PlusCount() {
    let value = prodCount.current.value;
    if (value < 100) {
      prodCount.current.value = +value + 1;
      return ChangeCountOfProduct();
    }
  }

  function MinusCount() {
    let value = prodCount.current.value;
    if (value != 1) {
      prodCount.current.value = +value - 1;
      return ChangeCountOfProduct();
    }
  }

  function ChangeCountOfProduct() {
    let newPrice = AllProductPrice - total + prodCount.current.value * product.price;
    let changesArr = cartList.map((el) => {
      if (el.id == product.id) {
        el.count = prodCount.current.value;
        el.total = (prodCount.current.value * product.price).toFixed(2);
      }
      return el;
    });
    localStorage.setItem("Cart", JSON.stringify(changesArr));
    localStorage.setItem("TotalPrice", JSON.stringify(newPrice.toFixed(2)));
    setTotal((prodCount.current.value * product.price).toFixed(2));
    setCartList(changesArr);
  }

  function RemoveFromBasket() {
    let changesArr = cartList.filter((el) => el.id != product.id);
    localStorage.setItem("Cart", JSON.stringify(changesArr));
    setCartList(changesArr);
    localStorage.setItem(
      "TotalPrice",
      JSON.stringify((AllProductPrice - total).toFixed(2))
    );
  }

  return (
    <div className="cart_card">
      <div className="card_exit_module" onClick={RemoveFromBasket}></div>
      <div className="card_image">
        <img src={product.image} alt="" />
      </div>
      <div className="card_info">
        <div className="card_prod_title">{product.title}</div>
        <div className="card_count_and_price">
          <div className="get_count" id="card_get_count">
            <button
              className="minus_count"
              id="card_minus_count"
              onMouseDown={MinusCount}
            >
              -
            </button>
            <input
              type="number"
              className="prod_count"
              id="card_prod_count"
              defaultValue={product.count}
              ref={prodCount}
              disabled={true}
            />
            <button
              className="plus_count"
              id="card_plus_count"
              onMouseDown={PlusCount}
            >
              +
            </button>
          </div>
          <div className="card_price">
            <span className="price_word">price: </span>
            <span className="price_num">{product.price}$</span>
          </div>
        </div>
        <div className="card_total">
          <span className="total_word">total: </span>
          <span className="total_num">{total}$</span>
        </div>
      </div>
    </div>
  );
}
