import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../pages/Auth/modal.css";

function UpdateUser({ isOpen, onClose, user, onUpdate }) {
  // 🆕 Use useEffect to update form data when the 'user' prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "", // password should always be empty
      });
    }
  }, [user]);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "", // optional new password
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      toast.error("User ID is missing.");
      return;
    }

    try {
      const res = await axios.put(
        `https://furgetnot.onrender.com/api/admin/user/update/${user._id}`, // 🎯 Use user._id from props
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        onUpdate(res.data.user); // 🎯 Send updated user back to parent
        onClose();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  if (!isOpen || !user) return null; // 🎯 Don't render if the modal is closed or user data is missing

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-[80%] max-w-md relative modal-animation">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 text-xl hover:text-red-500"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4 text-orange-800">
          Update User
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="User name"
            className="border rounded-lg px-4 py-2"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="User email"
            className="border rounded-lg px-4 py-2"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New password (optional)"
            className="border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
