import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Logout2 from "./Logout2";

function Header() {
  const [username, setusername] = useState("");
  const [timeDAte, settimeDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const getUsername = async () => {
    try {
      const res = await axios.get("https://furgetnot.onrender.com/api/user/me", {
        withCredentials: true,
      });
      setusername(res.data.user.name);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    getUsername();
  }, []);
   useEffect(() => {
    const date = new Date();
    settimeDate(date.toDateString());
    // console.log(date.toDateString());
    
    // Set time every second (clock)
    const interval = setInterval(() => {
      const now = new Date();

      // Convert to IST manually
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };

      const timeInIST = now.toLocaleTimeString("en-US", options);
      setCurrentTime(timeInIST); 
    }, 1000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className="bg-orange-200 shadow-lg px-6 py-4 flex items-center gap-1 justify-evenly md:gap-25 ">
        {/* Logo */}
        <div className="text-2xl font-bold text-orange-900 flex items-center gap-2">
          <span role="img" aria-label="logo" className="text-3xl">
            🐾
          </span>
          FurGetNot
        </div>

        {/* Right section */}
        <div className="flex flex-row justify-evenly items-center gap-5">
          {/* Message icon */}
          <button className="flex justify-evenly items-center gap-3">
            Logout
            <Logout2 />
          </button>
        </div>
      </nav>
      <div className="flex justify-end items-center gap-9 bg-orange-50 p-2 md:pl-8 shadow-lg md:justify-start  ">
        <div className="text-xs ">
          <p>{timeDAte}</p>
          <p>{currentTime}</p>
        </div>

        <div className="flex gap-5">
        {/* Notification icon */}
        <div>
        <FontAwesomeIcon
          icon={faBell}
          className="text-gray-700 text-xl hover:text-orange-700 cursor-pointer pt-1"
        />
        </div>
        {/* User name */}
        <div className="flex items-center gap-4 text-gray-800 font-medium">
          <FontAwesomeIcon icon={faUser} className="text-lg" />
          <span className="font-semibold text-xl">{username}</span>
        </div>
        </div>
      </div>
    </>
  );
}

export default Header;
