import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../App";

export default function Login() {
    const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function login() {
    fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setLoggedIn(true)
        console.log(data);
        navigate('/products')
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <>
      <div>
        <form
          className="flex flex-col max-w-[600px] mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <input
            className="my-2 p-2 h-[50px] border-solid border-orange-500 border-2"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="my-2 p-2 h-[50px] border-solid border-orange-500 border-2"
            type="password"
            name=""
            id=""
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="h-[50px] bg-black text-white" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
