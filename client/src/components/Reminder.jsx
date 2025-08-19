import React, { useEffect } from 'react'
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../pages/Auth/modal.css";

function Reminder({ isOpen, onClose, petId }) {
    const [formData, setFormData] = useState({
    title: "",
    description: "",
    dateTime: "",
    phoneNumber: "",
  });
 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/reminders/add",
        {
          ...formData,
          petId, // ✅ send selected petId
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
       
        onClose();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Reminder creation failed");
    }
  };
  useEffect(() => {
   handleSubmit()
  }, [])
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative modal-animation">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 text-xl hover:text-red-500"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-orange-800 mb-4">
          Set Reminder
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Reminder Title"
            className="border rounded-lg px-4 py-2"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded-lg px-4 py-2"
            rows={3}
          />
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border rounded-lg px-4 py-2"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Create Reminder
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reminder