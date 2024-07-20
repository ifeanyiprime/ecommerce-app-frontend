import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../App";
import LoginButton from "./LoginButton";

export default function AccountCard() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [accHidden, setAccHidden] = useState(true);
  const [user, setUser] = useState();
  useEffect(() => {
    console.log("account card");
    console.log(loggedIn);
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/api/accounts/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data.user);
        console.log(data);
      })
      .catch();
  }, [loggedIn]);
  return !loggedIn ? (
    <LoginButton />
  ) : (
    <>
      <button
        onClick={(e) => {
          setAccHidden(false);
        }}
        className="w-10 h-10 flex-shrink-0 "
      >
        <img
          className="w-full h-auto object-cover "
          src={
            user?.profile_img
              ? "http://localhost:8000" + user?.profile_img
              : "../../images/image-avatar.png"
          }
          alt=""
        />
      </button>
      {!accHidden ? (
        <div
          onClick={(e) => {
            setAccHidden(true);
          }}
          className="fixed left-0 top-0 z-[100] bg-[#3a3a3a56] w-screen h-screen"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white min-w-[300px] absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex flex-col rounded-xl text-center font-semibold p-4"
          >
            <span className="my-2 text-orange-600">Profile</span>
            <img
              className="w-1/2 self-center"
              src={
                user?.profile_img
                  ? "http://localhost:8000" + user?.profile_img
                  : "../../images/image-avatar.png"
              }
              alt=""
            />
            <span className="my-2 text-2xl">
              {!user ? "full name" : user.username}
            </span>
            <span>0 items in cart</span>
            <span>profile settings</span>
            <button
              onClick={() => {
                setLoggedIn(false);
                navigate("/");
              }}
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
