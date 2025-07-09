import React, { useState } from "react";
import google from "../../assets/Images/google.png";
import "./modal.css"; // ✅ optional, if using animation
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase.js";

function Login({ isOpen, onClose }) {
  if (!isOpen) return null;
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

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
      const res = await axios.post(
        " https://furgetnot.onrender.com/api/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setloading(true);
       
        setTimeout(() => {
          navigate("/home");
          toast.success(res.data.message);
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const res = await axios.post(
        " https://furgetnot.onrender.com/api/auth/google",
        { idToken },
        { withCredentials: true }
      );

      if (res.data.success) {
         setloading(true);
       
        setTimeout(() => {
          navigate("/home");
          toast.success(res.data.message);
        }, 2000);
         
      }
    } catch (error) {
      toast.error("Google login failed");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-[80%] max-w-md relative modal-animation">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 text-xl hover:text-red-500"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4 text-orange-800">
          Login
        </h2>

        <form className="flex flex-col gap-4" onSubmit={loginSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 cursor-pointer"
          >
            {loading ? "Loading..." : "Submit"}
          </button>

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
        </form>
      </div>
    </div>
  );
}

export default Login;
