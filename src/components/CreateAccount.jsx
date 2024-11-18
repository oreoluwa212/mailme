import { useNavigate } from "react-router-dom";
import { logo } from "../assets";

export default function CreateAccount() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/create-email");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-4">
          <img src={logo} className="w-[128px]" alt="logo" />
          <h3 className="text-3xl font-semibold my-4 text-gray-800">
            Create an account
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First name"
            className="w-full p-3 mb-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Last name"
            className="w-full p-3 mb-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="relative my-4">
            <input
              type="text"
              placeholder="01/11/1992"
              className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
