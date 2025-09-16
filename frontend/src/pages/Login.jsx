import { useState } from "react";
import axios from "axios"; 
import { useAuthContext } from "../hooks/useAuthContext";
import { GoogleLogin } from "@react-oauth/google";

// Error component
const ErrorMessage = ({ message }) => (
  message ? (
    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
      {message}
    </div>
  ) : null
);

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { dispatch } = useAuthContext();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Login API
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });
      dispatch({ type: "LOGIN", payload: res.data });
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  // Signup API
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      dispatch({ type: "LOGIN", payload: res.data });
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  // Google Auth API
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/googleauth`, {
        token: credentialResponse.credential,
      });
      dispatch({ type: "LOGIN", payload: res.data });
    } catch (err) {
      console.log(err)
      setError("Google sign-in failed. Please try again.");
    }
  };

  const handleGoogleFailure = () => {
    setError("Google sign-in was cancelled or failed.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Error message */}
        <ErrorMessage message={error} />

        <form
          onSubmit={isLogin ? handleLogin : handleSignup}
          className="space-y-4"
        >
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Google Login */}
        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>

        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-orange-500 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};
