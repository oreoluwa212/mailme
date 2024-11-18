import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaKey } from "react-icons/fa";
import { logo } from "../assets";

export default function PrivateKeyPage() {
  const navigate = useNavigate();
  const [privateKey] = useState(() =>
    Math.random().toString(36).substring(2, 38)
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(privateKey);
    alert("Private key copied to clipboard!");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <button
          className="p-2 rounded-full hover:bg-gray-200 transition-colors mb-4"
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
        <div className="flex flex-col items-center justify-center mb-8">
          <p className="text-gray-600 mb-4 font-medium">Your Private key:</p>
          <p className="text-gray-800 text-sm font-mono truncate w-full text-center">
            {privateKey}
          </p>
        </div>
        <div className="space-y-4">
          <button
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            onClick={handleCopy}
          >
            Copy
          </button>
          <button
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            onClick={() => navigate("/public-address")}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
