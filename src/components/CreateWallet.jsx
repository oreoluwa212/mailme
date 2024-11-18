import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaWallet } from "react-icons/fa";
import { logo, metamask } from "../assets";

export default function CreateWallet() {
  const [walletType, setWalletType] = useState("");
  const navigate = useNavigate();

  const handleWalletTypeChange = (type) => {
    setWalletType(type);
  };

  const handleCreateWallet = () => {
    // Handle wallet creation logic here
    navigate("/private-key");
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
              Create wallet
              <FaWallet className="text-sm" color="#105E5D" />
            </h3>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mb-8">
          <img src={metamask} className="w-[128px]" alt="logo" />
          <p className="text-gray-600 mt-2">
            You can import a your wallet if you already have one, by clicking
            the “Import metamask wallet” or “Create a wallet” to Create a new
            wallet.
          </p>
        </div>
        <div className="space-y-4">
          <button
            className={`w-full py-3 rounded-lg transition-colors ${
              walletType === "import"
                ? "bg-primary text-white hover:bg-green-700"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleWalletTypeChange("import")}
          >
            Import Metamask wallet
          </button>
          <button
            className={`w-full py-3 rounded-lg transition-colors ${
              walletType === "create"
                ? "bg-primary text-white hover:bg-green-700"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleWalletTypeChange("create")}
          >
            Create a wallet
          </button>
          <button
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            onClick={handleCreateWallet}
          >
            {walletType === "import" ? "Import" : "Create"} wallet
          </button>
        </div>
      </div>
    </div>
  );
}
