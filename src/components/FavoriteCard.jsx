import Favorite from "./ImagesSVG/FavoriteSVG";

export default function FavoriteCard({
  product,
  favoriteList,
  setFavoriteList,
  cartList,
  setCartList,
}) {
  let LastTotalPrice = JSON.parse(localStorage.getItem("TotalPrice")) ?? Number(0);

  function RemoveFromFav() {
    let changesArr = favoriteList.filter((el) => el.id != product.id);
    localStorage.setItem("Favorite", JSON.stringify(changesArr));
    setFavoriteList(changesArr);
  }

  function AddToCart() {
    let checkCart = JSON.stringify(cartList).includes(
      JSON.stringify(product.id)
    );
    if (!checkCart) {
      let changesArr = [...cartList, product];
      localStorage.setItem("Cart", JSON.stringify(changesArr));
      localStorage.setItem(
        "TotalPrice",
        JSON.stringify((+LastTotalPrice + product.price).toFixed(2))
      );
      setCartList(changesArr);
    }
  }

  return (
    <div className="fav_card">
      <button className="fav_svg" onClick={RemoveFromFav}>
        <Favorite
          width={"25px"}
          height={"25px"}
          fill={"red"}
          stroke={"red"}
          strokeWidth={"1.4px"}
        />
      </button>
      <div className="card_image">
        <img src={product.image} alt="" />
      </div>
      <div className="card_info fav_info">
        <div className="card_fav_title">{product.title}</div>
        <div className="fav_prod_price">
          <span className="price_word">price: </span>
          <span className="price_num"> {product.price}$</span>
        </div>
        <button className="add_to_cart" onClick={AddToCart}>
          Add
        </button>
      </div>
    </div>
  );
}
