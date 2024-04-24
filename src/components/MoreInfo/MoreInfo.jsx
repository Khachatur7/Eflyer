import { useRef, useState } from "react";
import Star from "../ImagesSVG/StarSVG";
import "../MoreInfo/MoreInfo.css";

export default function MoreInfo({
  product,
  closeModule,
  cartList,
  setCartList,
}) {
  let titleSize = product.title.length > 70 ? true : false;
  let descriptionSize =
    product.description.length > 300 && product.description.length < 600
      ? true
      : false;
  let descriptionSize2 = product.description.length > 600 ? true : false;
  let count = product.rating.rate.toFixed(1);
  let stars = [
    count >= 1 && count > 0 ? 1 : count > 0 ? count : 0,
    count - 1 >= 1 && count - 1 > 0
      ? 1
      : count - 1 > 0
      ? (count - 1).toFixed(0)
      : 0,
    count - 2 >= 1 && count - 2 > 0
      ? 1
      : count - 2 > 0
      ? (count - 2).toFixed(0)
      : 0,
    count - 3 >= 1 && count - 3 > 0
      ? 1
      : count - 3 > 0
      ? (count - 3).toFixed(0)
      : 0,
    count - 4 >= 1 && count - 4 > 0
      ? 1
      : count - 4 > 0
      ? (count - 4).toFixed(0)
      : 0,
  ];
  let prodCount = useRef(0);
  let LastTotalPrice =
    JSON.parse(localStorage.getItem("TotalPrice")) ?? Number(0);

  function PlusCount() {
    let value = prodCount.current.value;
    if (value < 100) {
      return (prodCount.current.value = +value + 1);
    }
    return true;
  }

  function MinusCount() {
    let value = prodCount.current.value;
    if (value != 1) {
      return (prodCount.current.value = +value - 1);
    }
    return true;
  }

  function AddToCart() {
    let cartProduct = {
      category: product.category,
      title: product.title,
      description: product.description,
      id: "id=" + product.id,
      image: product.image,
      price: product.price,
      rate: product.rating.rate,
      count: prodCount.current.value,
      total: Math.floor(prodCount.current.value * product.price),
    };
    let checkCart = JSON.stringify(cartList).includes(
      JSON.stringify(cartProduct.id)
    );

    if (checkCart) {
      let changesArr = cartList.filter((el) => {
        if (el.id == cartProduct.id) {
          localStorage.setItem(
            "TotalPrice",
            JSON.stringify(
              ((+LastTotalPrice - el.total) + cartProduct.total).toFixed(2)
            )
          );
          el.count = cartProduct.count;
          el.total = cartProduct.total;
          
        }
        return el;
      });

      localStorage.setItem("Cart", JSON.stringify(changesArr));
      setCartList(changesArr);
    } else {
      let changesArr = [...cartList, cartProduct];
      localStorage.setItem("Cart", JSON.stringify(changesArr));
      localStorage.setItem(
        "TotalPrice",
        JSON.stringify((+LastTotalPrice + cartProduct.total).toFixed(2))
      );
      setCartList(changesArr);
    }
  }

  return (
    <div className="module_window">
      <div className="exit_module" onClick={closeModule}></div>
      <div className="all_information">
        <div id="img_module">
          <img src={product.image} alt="" />
        </div>
        <div className="text_info">
          <div
            className="module_prod_title"
            id={titleSize ? "module_title_size" : ""}
          >
            <span>{product.title}</span>
          </div>
          <div
            className="module_prod_description"
            id={
              descriptionSize
                ? "module_desc_size"
                : descriptionSize2
                ? "module_desc_size2"
                : ""
            }
          >
            <span>{product.description}</span>
          </div>
          <div id="module_prod_price">
            <span>
              <i>{product.price}$</i>
            </span>
          </div>
          <div id="module_prod_rate">
            <div id="stars">
              {stars.map((el, ind) => {
                if (el == 1) {
                  return (
                    <div className="star" key={ind + "module"}>
                      {" "}
                      <Star fill="#ff6a00" stroke="#ff6a00" />
                    </div>
                  );
                } else {
                  return (
                    <div className="star" key={ind + "module"}>
                      {" "}
                      <Star fill="none" stroke="#ff6a00" />
                    </div>
                  );
                }
              })}
            </div>
            <span>({product.rating.rate})</span>
          </div>
          <div className="get_count">
            <button className="minus_count" onMouseDown={MinusCount}>
              -
            </button>
            <input
              type="number"
              className="prod_count"
              defaultValue={1}
              ref={prodCount}
              disabled={true}
            />
            <button className="plus_count" onMouseDown={PlusCount}>
              +
            </button>
          </div>
          <button id="add_to_cart" onClick={AddToCart}>
            <span>Add To Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
