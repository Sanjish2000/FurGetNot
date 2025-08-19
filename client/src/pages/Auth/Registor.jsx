import React, { useState } from "react";
import "./modal.css";
import google from "../../assets/Images/google.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Registor({ isOpen, onClose }) {
  if (!isOpen) return null;
  const navigate = useNavigate();

  const [registration, setRegistration] = useState(false); // Loading
  const [role, setRole] = useState("user"); // 'user' or 'admin'

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setRegistration(true);

      const apiUrl =
        role === "admin"
          ? "https://furgetnot.onrender.com/api/admin/regitration/admin"
          : "https://furgetnot.onrender.com/api/user/register";

      const res = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-gray-400 ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                      res.data?.user?.name || res.data?.admin?.name
                    )}`}
                    alt="profile"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Welcome,{" "}
                    {res.data?.user?.name || res.data?.admin?.name} 👋
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Joined:{" "}
                    {new Date(
                      res.data?.user?.createdAt || res.data?.admin?.createdAt
                    ).toDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-none border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ));

        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setRegistration(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-100 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-[80%] max-w-md relative modal-animation">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 text-xl hover:text-red-500"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4 text-orange-800">
          Register
        </h2>

        {/* 🧑‍⚖️ Role selection */}
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
          Registering as:{" "}
          <span className="font-semibold text-orange-700">{role}</span>
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border rounded-lg px-4 py-2"
          />
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
            {registration ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registor;
