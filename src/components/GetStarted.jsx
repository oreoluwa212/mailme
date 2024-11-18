import { BsArrowRight } from "react-icons/bs";
import { logo } from "../assets";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/create-account");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="flex justify-center items-center flex-col text-center space-y-5">
        <img src={logo} alt="mail me logo" />
        <button
          onClick={handleGetStartedClick}
          className="w-full bg-primary hover:bg-opacity-80 text-white py-3 px-6 rounded-[15px] font-semibold space-x-3"
        >
          Get Started <BsArrowRight className="inline-block h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
