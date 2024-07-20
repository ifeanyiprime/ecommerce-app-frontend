import "./index.css";
import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

export const LoginContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
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

  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }
  function refreshTokens() {
    console.log("refreshing...");
    if (localStorage.refresh) {
      fetch("http://localhost:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: localStorage.refresh }),
      })
        .then((response) => {
          if(response.status === 401) {
            setLoggedIn(false)
          }
          if(!response.ok) {
            throw new Error('Something went wrong.')
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }
  useEffect(() => {
    const minutes = 1000 * 60;
    refreshTokens();
    setInterval(refreshTokens, minutes * 3);
  }, []);
  return (
    <>
      <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
        <div className="max-w-[1400px] mx-auto">
          <BrowserRouter>
            <Header cart={cart}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:product" element={<Product cart={cart} setCart={setCart} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </Header>
          </BrowserRouter>
          <Footer />
        </div>
      </LoginContext.Provider>
    </>
  );
}

export default App;
