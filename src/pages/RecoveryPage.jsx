import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import { logo } from "../assets"; // Replace with your logo path

export default function BackupKeyPage() {
  const navigate = useNavigate();

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
          <h3 className="text-3xl font-semibold my-4 inline-flex gap-2 items-center text-gray-800">
            Backup your key <FaShieldAlt className="text-sm" color="#105E5D" />
          </h3>
        </div>
        <p className="text-gray-600 text-center mb-8">
          Please ensure you have securely backed up your private key and address. 
          You may also choose to create a recovery phrase for added security.
        </p>
        <div className="space-y-4">
          <button
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            onClick={() => navigate("/recovery-phrase")} // Replace with the actual route for viewing the recovery phrase
          >
            View Recovery Phrase
          </button>
          <button
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            onClick={() => navigate("/login")}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
