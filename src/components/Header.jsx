import { useState } from "react";
import { NavLink } from "react-router-dom";

import Cart from './Cart'
import AccountCard from "./AccountCard";

export default function Header(props) {
  const links = [
    { name: "Products", link: "/products" },
    { name: "Collections", link: "/collections" },
    { name: "Men", link: "/men" },
    { name: "Women", link: "/women" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];
  const [hidden, setHidden] = useState(false);
  return (
    <>
      <div
        className={
          !hidden
            ? "hidden"
            : "block" + " fixed z-[500] left-0 h-[100vh] w-[400px] bg-white "
        }
      >
        <div className="flex flex-col p-2">
          <div className="w-5" onClick={() => {
            setHidden(false)
          }}><img className="w-full h-auto" src="../../images/icon-close.svg" alt="" /></div>
          
          {links.map((link) => {
            return (
              <NavLink className="my-2 text-black hover:text-black" key={link.name} to={link.link}>
                {link.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div
        className={
          !hidden
            ? "hidden"
            : "block" +
              " fixed z-[400] left-0 h-[1000vh] w-[1000vh] bg-[rgba(0,0,0,0.69)] "
        }
      ></div>
      <div className="flex flex-row justify-between items-center max-w-[950px] mx-auto border-b-2">
        <div
          className="sm:hidden block w-7 h-7 flex-shrink-0"
          onClick={() => {
            if (hidden) {
              setHidden(false);
            } else {
              setHidden(true);
            }
            console.log(hidden);
          }}
        >
          <img
            className="w-full h-auto"
            src="../../images/icon-menu.svg"
            alt=""
          />
        </div>
        <div className="font-extrabold text-2xl "><NavLink className="text-black hover:no-underline hover:text-orange-500" to="/">sneakers</NavLink></div>
        <div className="hidden sm:flex h-[70px]">
          {links.map((item) => {
            return (
              <NavLink
                key={item.name}
                to={item.link}
                className={({ isActive }) => {
                  if (isActive) {
                    return "font-semibold text-orange-500 hover:no-underline hover:text-orange-500 p-4 h-full relative after:absolute after:bottom-0 after:w-full after:h-1 after:bg-orange-500 after:rounded-xl after:transform after:left-1/2 after:-translate-x-1/2 "
                  }
                  return "font-semibold hover:no-underline hover:text-orange-500 h-full text-black p-4 relative ";
                }}
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>
        <Cart cart={props.cart} />
        <AccountCard />
      </div>
      {props.children}
    </>
  );
}
