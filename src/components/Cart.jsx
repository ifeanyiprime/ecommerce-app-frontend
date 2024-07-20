import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../App";

import CartItem from "./CartItem";

export default function Cart({cart}) {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [items, setItems] = useState([
    {
      src: "../../images/image-product-1-thumbnail.jpg",
      name: "Fall Limited Edition Sneakers",
      price: 125.0,
      quantity: 3,
    },
  ]);
  const [hidden, setHidden] = useState(true);
  
  function deleteCartItem() {}
  return (
    <>
      <div
        className={" mr-5 flex-shrink-0 flex-row w-[50px]"}
        /* onMouseOver={(e) => {
          e.stopPropagation();
          console.log(hidden);
          setHidden(false);
        }}
        onMouseOut={(e) => {
          e.stopPropagation();
          console.log(hidden);
          setHidden(true);
        }} */
      >
        <Link to={'/cart'}>
          <img src="../../images/icon-cart.svg" alt="" />
        </Link>
        <button
          className={hidden ? "rotate-90" : "-rotate-90"}
          onClick={(e) => {
            e.stopPropagation();
            if (hidden) {
              setHidden(false);
            } else {
              setHidden(true);
            }
            window.addEventListener('click', (e) => {
              setHidden(true)
            })
          }}
          
        >
          &gt;
        </button>
      </div>
      <div
      
        className={
          hidden
            ? "hidden"
            : "block " +
              " absolute z-10 right-10 top-20 shadow-lg w-[300px] min-h-[200px] rounded-xl bg-white "
        }
      >
        <div className="font-bold p-3 border-b-2 border-grey border-solid">
          Cart
        </div>
        <div className="p-3 flex flex-col gap-3">
          {!cart ? (
            "No Items in your cart at the moment"
          ) : (
            <>
              {cart?.items.map((item, key) => {
                return (
                  <CartItem
                    key={key}
                    imgSrc={"../../images/image-product-1-thumbnail.jpg"}
                    name={item.product.name}
                    price={item.product.price}
                    quantity={item.quantity}
                    total={item.product.price * item.quantity}
                  />
                );
              })}
              <button className="my-1 w-full p-3 rounded-xl bg-[hsl(26,100%,55%)] text-white text-center font-semibold">
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
