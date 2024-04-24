import "./Product.css";
import Favorite from "../ImagesSVG/FavoriteSVG";
import Search from "../ImagesSVG/SearchSVG";
import Cart from "../ImagesSVG/CartSVG";

export default function Product({
  product,
  openModule,
  favoriteList,
  setFavoriteList,
  cartList,
  setCartList,
}) {
  let cartProduct = {
    category: product.category,
    title: product.title,
    description: product.description,
    id: "id=" + product.id,
    image: product.image,
    price: product.price,
    rate: product.rating.rate,
    count: 1,
    total: +product.price,
  };
  //  checking we need to do title size smaller or not
  let fontSize = product.title.length > 70 ? true : false;
  //  checking this product was added or not to favorite list
  let checkFav = JSON.stringify(favoriteList).includes(JSON.stringify(cartProduct.id));
  //  checking this product was added or not to cart list
  let checkCart = JSON.stringify(cartList).includes(
    JSON.stringify(cartProduct.id)
  );
  // checking our last total price for all products from cart list
  let LastTotalPrice =
    JSON.parse(localStorage.getItem("TotalPrice")) ?? Number(0);

  function AddToFavorite() {
    if (checkFav) {
      let changesArr = favoriteList.filter((el) => el.id != cartProduct.id);
      localStorage.setItem("Favorite", JSON.stringify(changesArr));
      setFavoriteList(changesArr);
    } else {
      let changesArr = [...favoriteList, cartProduct];
      localStorage.setItem("Favorite", JSON.stringify(changesArr));
      setFavoriteList(changesArr);
    }
  }

  function AddToCart() {
    if (checkCart) {
      let changesArr = cartList.filter((el) => el.id != cartProduct.id);
      localStorage.setItem("Cart", JSON.stringify(changesArr));
      cartList.map((el) => {
        if (el.id == cartProduct.id) {
          localStorage.setItem(
            "TotalPrice",
            JSON.stringify((+LastTotalPrice - el.total).toFixed(2))
          );
        }
      });
      setCartList(changesArr);
    } else {
      let changesArr = [...cartList, cartProduct];
      localStorage.setItem("Cart", JSON.stringify(changesArr));
      localStorage.setItem(
        "TotalPrice",
        JSON.stringify((+LastTotalPrice + cartProduct.price).toFixed(2))
      );
      setCartList(changesArr);
    }
  }

  return (
    <div className="product">
      <div className="img">
        <div className="tools">
          <div className={checkFav ? "tool fav_active" : "tool"} onClick={AddToFavorite}>
            <Favorite
              width={"30px"}
              height={"30px"}
              fill={checkFav ? "red" : "none"}
              stroke={checkFav ? "red" : "#8f8f8f"}
              strokeWidth={"1.4px"}
            />
          </div>
          <div className="tool" onClick={openModule}>
            <Search
              width={"30px"}
              height={"30px"}
              stroke={"#8f8f8f"}
              strokeWidth={"1.4px"}
              fill={"none"}
            />
          </div>
          <div
            className={checkCart ? "tool cart_active" : "tool"}
            onClick={AddToCart}
          >
            <Cart
              width={"35px"}
              height={"35px"}
              fill={checkCart ? "#ffae00" : "none"}
              stroke={checkCart ? "#ffae00" : "#8f8f8f"}
              strokeWidth={"1px"}
            />
          </div>
        </div>
        <img src={product.image} alt="prod_image" />
      </div>
      <div className="product_info">
        <div className="prod_category">
          <span>{product.category}</span>
        </div>
        <div className={fontSize ? "prod_title size" : "prod_title"}>
          <span>{product.title}</span>
        </div>
        <div className="prod_price">
          <span>
            <i>{product.price}$</i>
          </span>
        </div>
      </div>
    </div>
  );
}
