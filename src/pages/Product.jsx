import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Description from "../components/Description";
import ImageViewer from "../components/ImageViewer";

export default function Product({setCart, cart}) {
  const { product } = useParams();
  const [productData, setProductData] = useState();
  const [images, setImages] = useState()
  const url = "http://localhost:8000/api/products/" + product;
  useEffect(() => {
    console.log("in product page");
    console.log(product);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        return response.json();
      })
      .then((data) => {
        setProductData(data)
        setImages(data['images'])
        console.log(data);
        console.log(data['images']);
      })
      .catch((err) => {
        console.log(err.message)
      });
  }, []);

  

  return (
    <>
      <div className="flex flex-row max-w-[900px] mx-auto mt-4">
        <ImageViewer url={url}  />
        <Description details={productData} id={product} cart={cart} setCart={setCart} />
      </div>
    </>
  );
}
