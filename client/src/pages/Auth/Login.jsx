import React, { useState } from "react";
import google from "../../assets/Images/google.png";
import "./modal.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase.js";

function Login({ isOpen, onClose }) {
  if (!isOpen) return null;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("user"); // Default: user

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Select API based on role
      const apiUrl =
        role === "admin"
          ? "http://localhost:5000/api/admin/login/admin"
          : "http://localhost:5000/api/user/login";

      const res = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Needed for cookie
      });

      if (res.data.success) {
        // ✅ Save to localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem(
          "name",
          res.data.user?.name || res.data.admin?.name
        );

        // toast.success(res.data.message);

        // ✅ Delay thoda badhao to let ProtectedRoute settle
        setTimeout(() => {
          toast.success(res.data.message); 
          window.location.href = res.data.role === "admin" ? "/admin" : "/home";
        }, 500); // Use window.location.href to FORCE page reload
      }
    } catch (error) {
      alert(error)
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        { idToken },
        { withCredentials: true }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", "user");
        localStorage.setItem("name", res.data.user?.name);

        // toast.success(res.data.message || "Google login successful");

        setTimeout(() => {
          toast.success(res.data.message || "Google login successful");
          navigate("/home");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error("Google login failed");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-[80%] max-w-md relative modal-animation">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 text-xl hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4 text-orange-800">
          Login
        </h2>

        {/* 🧑‍⚖️ Role Selection */}
        <div className="flex justify-center gap-6 mb-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />
            User
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            Admin
          </label>
        </div>

        <p className="text-xs text-center text-gray-600 mb-2">
          Logging in as:{" "}
          <span className="font-semibold text-orange-700">{role}</span>
        </p>

        <form className="flex flex-col gap-4" onSubmit={loginSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-lg px-4 py-2"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border rounded-lg px-4 py-2"
            required
          />
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 cursor-pointer"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          {/* Google login (only for user) */}
          {role === "user" && (
            <div className="flex justify-center items-center mt-2">
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="flex flex-row items-center gap-2 cursor-pointer"
              >
                <img src={google} alt="google" width={35} height={35} />
                <p className="text-sm text-gray-600">Login with Google</p>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
