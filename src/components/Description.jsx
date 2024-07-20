import { useState, useEffect } from "react";

import ItemAmount from "./ItemAmount";

export default function Description({ details, id, setCart, cart }) {
  const [quantity, setQuantity] = useState(0);
  console.log('product: ', id)
  function addToCart() {
    fetch("http://localhost:8000/api/carts/", {
      method: "POST",
      headers: {'Content-Type' : 'application/json', Authorization: "Bearer " + localStorage.getItem("access") },
      body: JSON.stringify({ product: id, quantity }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        fetch("http://localhost:8000/api/carts/")
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setCart(data)
        });
      });
  }
  return (
    <>
      {details ? (
        <div className="flex flex-col p-14">
          <div className="text-[hsl(26,100%,55%)] font-bold text-lg uppercase">
            sneaker company
          </div>
          <div className="text-4xl font-bold my-3">
            {details.name ? details.name : `Fall Limited Edition Sneakers`}
          </div>
          <div className="text-gray-600 leading-6 font-semibold my-3">
            {details.description
              ? details.description
              : `These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they'll withstand everything
          the weather can offer.`}
          </div>
          <div className="w-[130px] flex flex-row justify-between items-center mt-1">
            <span className="text-xl font-bold ">
              {details.price ? "$" + details.price : `$125.00`}
            </span>
            <span className="p-1 text-sm font-bold text-[hsl(26,100%,55%)] bg-[hsl(25,100%,94%)] rounded-lg">
              50%
            </span>
          </div>
          <div>$250.00</div>
          <div>{details.quantity} in stock</div>
          <div className="flex">
            <ItemAmount quantity={quantity} setQuantity={setQuantity} />
            <button
              className="ml-3 w-[200px] h-[50px] bg-[hsl(26,100%,55%)] text-white rounded-xl font-bold"
              onClick={addToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
