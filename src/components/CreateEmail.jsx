import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../assets";

export default function CreateAccountPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordLessThan8Chars, setPasswordLessThan8Chars] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length >= 8 && password === confirmPassword) {
      navigate("/connect-wallet");
    } else {
      setPasswordLessThan8Chars(password.length < 8);
      setPasswordSaved(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center justify-center mb-4">
          <img src={logo} className="w-[128px]" alt="logo" />
          <h3 className="text-3xl font-semibold my-4 text-gray-800">
            Create an account
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {passwordSaved && (
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500">
                ✓
              </span>
            )}
            {passwordLessThan8Chars && (
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500">
                ✕
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {password === confirmPassword && (
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500">
                ✓
              </span>
            )}
            {password !== confirmPassword && (
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500">
                ✕
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Connect wallet
          </button>
        </form>
      </div>
    </div>
  );
}
