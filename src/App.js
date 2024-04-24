import { useState, useEffect, useRef } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

export default function App() {
  // create a state for future category selection
  let [choosen, setChoosen] = useState(false)
  // default url
  let url = `https://fakestoreapi.com/products`
  let urlForFetch = useRef()
  // check if the category has been selected
  urlForFetch.current = choosen && choosen != "All" ? `${url}/category/${choosen}` : url;
  // our received data from the server
  let [prodList, SetProdList] = useState(false);
  // our received data from localStroge if user have favorite products
  let [favoriteList, setFavoriteList] = useState(JSON.parse(localStorage.getItem("Favorite")) ?? [])
  // or cart products
  let [cartList, setCartList] = useState(JSON.parse(localStorage.getItem("Cart")) ?? [])
  useEffect(() => {
    fetch(urlForFetch.current)
      .then((res) => res.json())
      .then((res) => SetProdList(res))
      .catch((er) => {
        console.log(er);
        setChoosen(false)
      });
  }, [choosen]);

  return (
    <>
      <div className='wrapper'>
        <Header
          url={url}
          choosen={choosen}
          setChoosen={setChoosen}
          SetProdList={SetProdList}
          prodList={prodList}
          cartList={cartList}
          setCartList={setCartList}
          favoriteList={favoriteList}
          setFavoriteList={setFavoriteList}
        />
        <Main
          prodList={prodList}
          url={urlForFetch.current}
          choosen={choosen}
          setChoosen={setChoosen}
          SetProdList={SetProdList}
          favoriteList={favoriteList}
          setFavoriteList={setFavoriteList}
          cartList={cartList}
          setCartList={setCartList}
        />
        <Footer />
      </div>
    </>
  );
}


