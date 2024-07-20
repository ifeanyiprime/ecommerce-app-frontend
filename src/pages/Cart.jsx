import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../App";

import CartItem from "../components/CartItem";

export default function Cart() {
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
  const [cart, setCart] = useState();
  useEffect(() => {
    fetch("http://localhost:8000/api/carts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCart(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [loggedIn]);
  return (
    <>
      
      <div
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
