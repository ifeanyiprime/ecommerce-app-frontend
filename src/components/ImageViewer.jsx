import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ImageViewer({ url }) {
  const [hidden, setHidden] = useState(true);
  const [images, setImages] = useState([
    {
      image_file: "../../images/image-product-1.jpg",
      thumbnail: "../../images/image-product-1-thumbnail.jpg",
      main: true,
    },
    {
      image_file: "../../images/image-product-2.jpg",
      thumbnail: "../../images/image-product-2-thumbnail.jpg",
      main: false,
    },
    {
      image_file: "../../images/image-product-3.jpg",
      thumbnail: "../../images/image-product-3-thumbnail.jpg",
      main: false,
    },
    {
      image_file: "../../images/image-product-4.jpg",
      thumbnail: "../../images/image-product-4-thumbnail.jpg",
      main: false,
    },
  ]);
  const [loading, setLoading] = useState(true);
  function updateThumbs(url) {
    let newImages = images.slice();
    console.log(newImages);
    newImages.map((image) => {
      if (url == image.image_file) {
        image.main = true;
      } else {
        image.main = false;
      }
    });
    console.log("here");
    console.log(newImages);
    setImages(newImages);
  }
  function cycleImg(step) {
    let newImages = images.slice();
    let current;
    newImages.forEach((image) => {
      if (image.main) {
        current = newImages.indexOf(image);
        console.log(newImages.indexOf(image));
      }
    });
    newImages[current].main = false;
    if (step === "next") {
      if (current + 1 === newImages.length) {
        current = 0;
      } else {
        current = current + 1;
      }
      newImages[current].main = true;
    } else if (step === "prev") {
      if (current - 1 < 0) {
        //newImages[current].main = false;
        current = 0;
      } else {
        current = current - 1;
      }
      newImages[current].main = true;
    }
    setImages(newImages)
  }
  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("in image viewer", data);
        setImages(data["images"]);
      });
    console.log(images);
  }, []);
  return (
    <>
      <div className="w-[460px] flex flex-col p-3" /* className="cont" */>
        <div className="relative h-[300px]">
          <div
            className={classNames(
              loading ? "block" : "hidden",
              "absolute top-0 w-full h-full z-10 bg-white flex flex-col justify-center items-center"
            )}
          >
            <span>Loading</span>
          </div>
          {images.map((image) => {
            if (image.main) {
              return (
                <img
                  key={image.image_file}
                  className="w-full h-full object-cover object-center rounded-xl"
                  src={"http://localhost:8000" + image.image_file}
                  onLoad={() => {
                    setLoading(false);
                  }}
                  onClick={() => {
                    setHidden(false);
                  }}
                />
              );
            }
          })}
        </div>
        <div className="flex flex-row justify-between mt-3 rounded-xl gap-4">
          {images.map((image) => {
            if (!image.main) {
              return (
                <div
                  key={uuidv4()}
                  className=" w-full h-auto rounded-xl relative after:hidden  after:absolute after:top-0 after:hover:block after:w-full after:h-full  after:bg-[rgba(255,255,255,0.38)]"
                  onClick={() => {
                    console.log("works");
                    updateThumbs(image.image_file);
                    setLoading(true);
                  }}
                >
                  <img
                    className="w-[100%] object-cover object-center rounded-xl "
                    src={"http://localhost:8000" + image.thumbnail}
                  />
                </div>
              );
            }
            return (
              <div
                key={uuidv4()}
                className="border-4 border-[hsl(26,100%,55%)] rounded-xl block w-full h-auto after:hidden  after:absolute after:top-0 after:hover:block after:w-full after:h-full  after:bg-[rgba(255,255,255,0.38)] relative"
                onClick={() => {
                  console.log("limited");
                  //updateThumbs(image.image_file);
                  //setLoading(true);
                  //active thumbnail shouldn't have this functionality.
                }}
              >
                <img
                  className="w-[100%] object-cover object-center rounded-xl "
                  src={"http://localhost:8000" + image.thumbnail}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={classNames(
          " fixed top-0 left-0 z-50 w-full h-full justify-center items-center bg-[rgba(0,0,0,0.8)]",
          hidden ? "hidden" : "flex"
        )}
        onClick={() => {
          setHidden(true);
        }}
      >
        <div
          className="w-[400px] h-auto flex flex-col " /* className="contH" */
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="relative h-[300px]">
            <div
              className={classNames(
                loading ? "block" : "hidden",
                "absolute top-0 w-full h-full z-10 bg-white flex flex-col justify-center items-center"
              )}
            >
              <span>Loading</span>
            </div>
            {images.map((image) => {
              if (image.main) {
                return (
                  <img
                    key={image.image_file}
                    className="w-full h-full object-cover object-center rounded-xl"
                    src={"http://localhost:8000" + image.image_file}
                    onLoad={() => {
                      setLoading(false);
                    }}
                  />
                );
              }
            })}

            <div
              onClick={() => {
                cycleImg("prev");
              }}
              className="absolute top-1/2 transform -translate-y-1/2 -left-4 w-10 h-10 p-3 z-10 flex justify-center items-center bg-white rounded-full"
            >
              <img
                className="text-white"
                src="../../images/icon-previous.svg"
                alt=""
              />
            </div>
            <div
              onClick={() => {
                cycleImg("next");
              }}
              className="absolute top-1/2 transform -translate-y-1/2 -right-4 w-10 h-10 p-3 z-10 flex justify-center items-center bg-white rounded-full"
            >
              <img
                className="text-white"
                src="../../images/icon-next.svg"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-row justify-between mt-3 rounded-xl gap-4">
            {/* <div className="flex flex-row justify-between mt-3 rounded-xl gap-4"> */}
            {images.map((image) => {
              if (!image.main) {
                return (
                  <div
                    key={uuidv4()}
                    className=" w-full h-auto rounded-xl relative after:hidden  after:absolute after:top-0 after:hover:block after:w-full after:h-full  after:bg-[rgba(255,255,255,0.38)]"
                    onClick={() => {
                      console.log("works");
                      updateThumbs(image.image_file);
                      setLoading(true);
                    }}
                  >
                    <img
                      className="w-[100%] h-[100%] object-cover object-center rounded-xl "
                      src={"http://localhost:8000" + image.thumbnail}
                    />
                  </div>
                );
              }
              return (
                <div
                  key={uuidv4()}
                  className="border-4 border-[hsl(26,100%,55%)] rounded-xl block w-full h-auto after:hidden  after:absolute after:top-0 after:hover:block after:w-full after:h-full  after:bg-[rgba(255,255,255,0.38)] relative"
                  onClick={() => {
                    console.log("works");
                    //updateThumbs(image.image_file);
                    //setLoading(true);
                    //active thumbnail shouldn't have this functionality.
                  }}
                >
                  <img
                    className="w-[100%] h-[100%] object-cover object-center rounded-xl "
                    src={"http://localhost:8000" + image.thumbnail}
                  />
                </div>
              );
            })}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
