import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { logo } from "../assets"; // Replace with your logo path

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Implement login logic here
    alert("Login successful!"); // Replace with actual login action
    navigate("/dashboard"); // Replace with the actual route after login
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="flex w-full flex-col items-center justify-center mb-4">
          <img src={logo} className="w-[128px]" alt="logo" />
          <h3 className="text-3xl font-semibold my-4 inline-flex gap-2 items-center text-gray-800">
            Login <FaLock className="text-sm" color="#105E5D" />
          </h3>
        </div>
        <div className="space-y-4 mb-6">
          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Username</label>
            <input
              type="text"
              placeholder="First name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col relative">
            <label className="text-gray-600 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-8 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <a href="/forgot-password" className="text-sm text-primary mt-2">
              Forgot Password?
            </a>
          </div>
        </div>
        <button
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            No account yet?{" "}
            <a href="/" className="text-primary font-semibold hover:underline">
              Get started
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
