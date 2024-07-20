import {Link} from 'react-router-dom'

export default function Home() {
  return (
    <>
      <div className="hero w-full h-[600px] relative">
        <img
          className=" block top-0 w-full h-full object-cover"
          src="../../images/white-sneakers.webp"
          alt=""
        />
        <div className="absolute z-10 top-28 left-8 p-3 w-[300px] h-[200px] rounded-2xl bg-[#3333336e] text-white text-xl font-bold shadow-2xl">
          <span>Get your quality SHOES on sale</span>
          <Link to={'/products'} className="block text-white text-center font-semibold bg-orange-600 p-2 rounded-xl mt-4">
            Start Shopping
          </Link>
        </div>
        <div className="absolute top-0 w-full h-full "></div>
      </div>
      <div className="p-10 my-10">
        <h2 className="m-4">Collections</h2>
        <div className="flex flex-row justify-around gap-8">
          <div className="flex flex-col h-[400px] w-1/4 rounded-xl overflow-hidden shadow-2xl">
            <div className="h-[70%]">
              <img
                className="w-full h-full object-cover"
                src="../../images/image-product-1.jpg"
                alt=""
              />
            </div>
            <div className="h-[30%] bg-orange-100 p-3 text-black text-xl text-center font-medium">
              <div className="text-2xl p-3">Men</div>
              <a className="text-orange-600 " href="">
                See more &gt;
              </a>
            </div>
          </div>
          <div className="flex flex-col h-[400px] w-1/4 rounded-xl overflow-hidden shadow-2xl">
            <div className="h-[70%]">
              <img
                className="w-full h-full object-cover"
                src="../../images/image-product-1.jpg"
                alt=""
              />
            </div>
            <div className="h-[30%] bg-orange-100 p-3 text-black text-xl text-center font-medium">
              <div className="text-2xl p-3">Women</div>
              <a className="text-orange-600 " href="">
                See more &gt;
              </a>
            </div>
          </div>
          <div className="flex flex-col h-[400px] w-1/4 rounded-xl overflow-hidden shadow-2xl">
            <div className="h-[70%]">
              <img
                className="w-full h-full object-cover"
                src="../../images/image-product-1.jpg"
                alt=""
              />
            </div>
            <div className="h-[30%] bg-orange-100 p-3 text-black text-xl text-center font-medium">
              <div className="text-2xl p-3">Children</div>
              <a className="text-orange-600 " href="">
                See more &gt;
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
