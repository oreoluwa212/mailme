import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { logo } from "../assets"; // Replace with your logo path

export default function PublicAddressPage() {
  const navigate = useNavigate();
  const publicAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"; // Replace with dynamic address if needed

  const handleCopy = () => {
    navigator.clipboard.writeText(publicAddress);
    alert("Public address copied to clipboard!");
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
          <h3 className="text-3xl font-semibold my-4 text-gray-800">
            Public Address
          </h3>
          <p className="text-gray-600 mb-2 text-center">
            This is your public address. You can share it with others as your address to receive emails securely.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mb-8">
          <p className="text-gray-800 text-sm font-mono truncate w-full text-center">
            {publicAddress}
          </p>
        </div>
        <div className="space-y-4">
          <button
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            onClick={handleCopy}
          >
            Copy Address
          </button>
          <button
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            onClick={() => navigate("/recovery-phrase")}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
