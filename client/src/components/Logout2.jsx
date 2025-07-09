import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import logoutAnimation from "../assets/aminmation/logout.json";
import toast from "react-hot-toast";


function Logout2() {
     const navigate = useNavigate(); // ✅ Move useNavigate to top-level
     
  const logOuthandler = async () => {
    try {
      const res = await axios.get("https://furgetnot.onrender.com/api/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
       
        setTimeout(() => {
          navigate("/");
          toast.success(res.data.message);
        }, 1000); // ✅ Include delay
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (

     <>
      <div onClick={logOuthandler} className="cursor-pointer w-10 h-12 ">
        <Lottie
          animationData={logoutAnimation}
          loop
          autoplay
          className='w-12 h-12'
        />
      </div>
    </>

  )
}

export default Logout2