import React, { useEffect, useState } from "react";
import Header from "../../../components/Header.jsx";
import axios from "axios";

function About() {
  const [done, setDone] = useState([]);
  const [notDone, setNotDone] = useState([]);

  const getReminders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/reminders/gett/reminder",
        { withCredentials: true }
      );

      if (res.data.success) {
        const all = res.data.reminders;
        setDone(all.filter((r) => r.isDone === true));
        setNotDone(all.filter((r) => r.isDone === false));
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  useEffect(() => {
    getReminders();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    });
  };

  return (
    <>
      <Header />
     <div className=" bg-orange pt-5 p-2 min-h-screen">
  {/* Not Done Reminders */}
  <div>
    <h2 className="text-xl font-bold text-red-700 border-b border-red-300 pb-2 mb-4 pl-2">
      Pending Reminders
    </h2>
    {notDone.length === 0 ? (
      <p className="text-sm text-gray-700">No pending reminders at the moment.</p>
    ) : (
      notDone.map((r) => (
        <div
          key={r._id}
          className="border border-red-300 p-4 mb-4 bg-white shadow-sm "
        >
          <p className="text-xl font-semibold text-red-800 mb-2">{r.title}</p>
          <p className="text-gray-700 mb-1">{r.description}</p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Scheduled Time:</span> {formatDate(r.dateTime)}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Status:</span>{" "}
            <span className="text-red-600 font-semibold">Not Done</span>
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">User:</span> {r.userId?.name || "Unknown"}
          </p>

          {r.petId && (
            <div className="mt-2 pl-4 border-l-4 border-orange-300">
              <p className="text-gray-700"><span className="font-medium">Pet Name:</span> {r.petId.name}</p>
              <p className="text-gray-700"><span className="font-medium">Breed:</span> {r.petId.breed}</p>
              <p className="text-gray-700"><span className="font-medium">Type:</span> {r.petId.type}</p>
              <p className="text-gray-700"><span className="font-medium">Age:</span> {r.petId.age} years</p>
            </div>
          )}
        </div>
      ))
    )}
  </div>

  {/* Done Reminders */}
  <div>
    <h2 className="text-xl font-bold text-green-700 border-b border-green-300  pb-2 mb-4 pl-2">
      Completed Reminders
    </h2>
    {done.length === 0 ? (
      <p className="text-sm text-gray-700">No completed reminders yet.</p>
    ) : (
      done.map((r) => (
        <div
          key={r._id}
          className="border border-green-300  p-4 mb-4 bg-white shadow-sm"
        >
          <p className="text-xl font-semibold text-green-800 mb-2">{r.title}</p>
          <p className="text-gray-700 mb-1">{r.description}</p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Scheduled Time:</span> {formatDate(r.dateTime)}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Status:</span>{" "}
            <span className="text-green-700 font-semibold">Done</span>
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">User:</span> {r.userId?.name || "Unknown"}
          </p>

          {r.petId && (
            <div className="mt-2 pl-4 border-l-4 border-orange-300">
              <p className="text-gray-700"><span className="font-medium">Pet Name:</span> {r.petId.name}</p>
              <p className="text-gray-700"><span className="font-medium">Breed:</span> {r.petId.breed}</p>
              <p className="text-gray-700"><span className="font-medium">Type:</span> {r.petId.type}</p>
              <p className="text-gray-700"><span className="font-medium">Age:</span> {r.petId.age} years</p>
            </div>
          )}
        </div>
      ))
    )}
  </div>
</div>
   </>
  );
}

export default About;
