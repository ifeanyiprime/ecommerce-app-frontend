export default function Footer() {
  return (
    <footer className=" bg-orange-500 justify-between items-center text-white flex p-8 mt-24">
      <div className="w-[50%] self-start">
        <form className="flex flex-col" action="">
          <input
            className="w-[300px] h-[40px] mb-2 pl-2 text-black"
            type="email"
            name=""
            id=""
            placeholder="your email address"
          />
          <button className="w-[250px] h-[40px] bg-black text-white  hover:text-blue-500 font-medium p-2">
            Sign up for our newsletter
          </button>
        </form>
      </div>
      <div className="w-[5px] h-[180px] rounded-lg bg-white"></div>
      <div className="w-[50%] pl-[60px]">
        <ul className="flex flex-wrap w-[200px] gap-3  font-">
          <li>Men</li>
          <li>Women</li>
          <li>Children</li>
          <li>Privacy</li>
          <li>Contact Us</li>
          <li>About Us</li>
        </ul>
        <h1 className="text-6xl">Logo</h1>
      </div>
    </footer>
  );
}
