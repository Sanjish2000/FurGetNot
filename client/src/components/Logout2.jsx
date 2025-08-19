// src/components/Logout2.jsx
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import logoutAnimation from "../assets/aminmation/logout.json";
import toast from "react-hot-toast";

function Logout2() {
  const navigate = useNavigate();

  const logOuthandler = async () => {
    const role = localStorage.getItem("role"); // check role
    const logoutURL =
      role === "admin"
        ? "https://furgetnot.onrender.com/api/admin/logout"
        : "https://furgetnot.onrender.com/api/user/logout";

    try {
      const res = await axios.get(logoutURL, {
        withCredentials: true,
      });

      if (res.data.success) {
        // Clear all
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");

        toast.success(res.data.message);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div onClick={logOuthandler} className="cursor-pointer w-10 h-12">
      <Lottie animationData={logoutAnimation} loop autoplay className="w-12 h-12" />
    </div>
  );
}

export default Logout2;
