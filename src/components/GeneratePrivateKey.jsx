import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaKey } from "react-icons/fa";
import { logo } from "../assets";

export default function GeneratePrivateKey() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/copy-key");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>
          <div className="flex w-full flex-col items-center justify-center mb-4">
            <img src={logo} className="w-[128px]" alt="logo" />
            <h3 className="text-3xl font-semibold my-4 inline-flex gap-4 justify-center items-center text-gray-800">
              Generate Private Key
              <FaKey className="text-sm" color="#105E5D" />
            </h3>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mb-8">
          <p className="text-gray-600 mt-2">
            The private key is unique to you and provides you access to your
            email. Keep it secure and never share it with anyone.
          </p>
        </div>
        <div className="space-y-4">
          <button
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Connect Metamask wallet
          </button>
          <button
            className="w-full py-3 rounded-lg transition-colors bg-gray-200 hover:bg-gray-300"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
