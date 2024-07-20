import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Products(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  useEffect(() => {
    fetch("http://localhost:8000/api/products/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
        }
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);
  return (
    <>
      <div className="p-4">
        <h1 className="ml-3 text-4xl">Products</h1>
        <div className="flex p-3 gap-4 flex-1">
          {products ? (
            products.map((product) => {
              return (
                <Link
                  className="hover:no-underline w-[50%]"
                  to={"/product/" + product.id}
                  key={product.id}
                >
                  {/* Make default box component and add skeleton loading */}
                  <div className="h-[300px]">
                    <div className="rounded-xl h-full overflow-hidden relative">
                      <span className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black font-semibold text-3xl">Loading...</span>
                      <img
                        className="relative z-20 rounded-xl object-center"
                        src={
                          "http://localhost:8000" +
                          product?.images[0]?.image_file
                        }
                        alt=""
                      />
                    </div>
                    <h3 className="text-orange-400 hover:text-orange-700 hover:no-underline ">
                      {product.name}
                    </h3>
                  </div>
                </Link>
              );
            })
          ) : (
            <p>No Products availalbe</p>
          )}
        </div>
      </div>
    </>
  );
}
