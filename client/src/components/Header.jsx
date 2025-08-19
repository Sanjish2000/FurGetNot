// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Logout2 from "./Logout2";
import { Link, useNavigate } from "react-router-dom";
// import UserData from "./UserData";
import UsserData from "./UsserData";

function Header() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [timeDate, setTimeDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [userShow, setUserShow] = useState(false);
  const navigate = useNavigate();

  const getUsername = async () => {
    const role = localStorage.getItem("role");
    const url =
      role === "admin"
        ? "http://localhost:5000/api/admin/me"
        : "http://localhost:5000/api/user/me";

    try {
      const res = await axios.get(url, { withCredentials: true });
      const data = role === "admin" ? res.data.admin : res.data.user;
      setUsername(data?.name || "No Name");
      setEmail(data?.email || "No Email");
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getReminder = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/reminders/gett/reminder",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const pending = res.data.reminders.filter((r) => r.isDone === false);
        setUnreadCount(pending.length);
      }
    } catch (err) {
      console.error("Error fetching reminders", err);
    }
  };

  useEffect(() => {
    getUsername();
    const role = localStorage.getItem("role");
    if (role === "user"||role === "undefined") getReminder();
  }, []);

  useEffect(() => {
    const date = new Date();
    setTimeDate(date.toDateString());

    const interval = setInterval(() => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(now.toLocaleTimeString("en-US", options));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className="bg-orange-200 shadow-lg px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-orange-900 flex items-center gap-2">
          <span role="img" aria-label="logo" className="text-3xl">
            🐾
          </span>
          <Link to="/home">FurGetNot</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-3">
            Logout
            <Logout2 />
          </button>
        </div>
      </nav>

      <div className="flex justify-between items-center bg-orange-50 p-2 px-6 shadow-lg relative">
        <div className="text-xs">
          <p>{timeDate}</p>
          <p>{currentTime}</p>
        </div>

        <div className="flex items-center gap-6">
          {(localStorage.getItem("role") === "user" ||
            localStorage.getItem("role") === "undefined") && (
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/about")}
            >
              <FontAwesomeIcon
                icon={faBell}
                className="text-gray-700 text-xl hover:text-orange-700"
              />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                  {unreadCount}
                </span>
              )}
            </div>
          )}

          <div
            className="flex items-center gap-2 text-gray-800 font-medium cursor-pointer"
            onClick={() => setUserShow(!userShow)}
          >
            <FontAwesomeIcon icon={faUser} className="text-lg" />
            <span className="font-semibold text-xl">{username}</span>
          </div>
        </div>

        {userShow && (
          <div className="absolute top-full right-6 mt-2 z-50">
            <UsserData
              username={username}
              email={email}
              role={localStorage.getItem("role")}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
