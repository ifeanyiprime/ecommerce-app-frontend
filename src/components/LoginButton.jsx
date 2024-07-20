import { useNavigate } from "react-router-dom";

export default function LoginButton() {
    const navigate = useNavigate();  return (
    <>
      <button
        onClick={(e) => {
            navigate('/login');
        }}
        className="bg-orange-300 text-white hover:cursor-pointer"
      >
        Login
      </button>
    </>
  );
}
