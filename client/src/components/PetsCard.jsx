import React, { useEffect, useState } from "react";
import Reminder from "../components/Reminder.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import UpdatePet from "./UpdatePet";
import "../pages/Auth/modal.css";
import correctIcon from "../assets/Images/correct.png"; // ✅ Correct path

function PetsCard({ id, name, type, age, breed, image, onDelete, onUpdate }) {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [allReminders, setAllReminders] = useState([]);

  const deletePet = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/pets/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => onDelete(id), 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting pet");
    }
  };

  const fetchReminders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/reminders/gett/reminder",
        { withCredentials: true }
      );
      if (res.data.success) {
        setAllReminders(res.data.reminders);
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [showReminder]);

  const handleMarkDone = async (reminderId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/reminders/done/${reminderId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Reminder marked as done ✅");
        // Refresh reminders
        fetchReminders();
      }
    } catch (error) {
      toast.error("Failed to mark reminder as done");
      console.error(error);
    }
  };

  const petReminders = allReminders.filter(
    (reminder) => reminder.petId?._id === id && !reminder.isDone
  );

  return (
    <>
      <div className="w-full md:w-1/4 bg-orange-50 rounded-2xl shadow-lg overflow-hidden mt-5 ml-1 flex-wrap modal-animation">
        <div className="relative w-full h-80">
          <img
            src={`http://localhost:5000/uploads/${image}?${Date.now()}`}
            alt={name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-evenly gap-6 text-white p-3">
            <div>
              <h2 className="text-2xl font-bold mb-1">{name}</h2>
              <p className="text-sm">Type: {type}</p>
              <p className="text-sm">Age: {age} Years</p>
              <p className="text-sm">Breed: {breed}</p>
            </div>

            {/* Reminders */}
            {petReminders.length > 0 && (
              <div className="bg-white/30 p-2 rounded-lg text-xs shadow-md font-semibold text-black mb-8">
                {petReminders.map((reminder) => (
                  <div
                    key={reminder._id}
                    className="mb-1 border-b pb-1 flex flex-row justify-evenly items-center gap-5 "
                  >
                    <div>
                      <p>📌 {reminder.title}</p>
                      <p>🕒 {new Date(reminder.dateTime).toDateString()}</p>
                      
                    </div>
                    <div className="pb-3" >
                   
                    <img
                      src={correctIcon}
                      alt="Mark as done"
                      onClick={() => handleMarkDone(reminder._id)}
                      className="w-6 h-6 mt-1 cursor-pointer hover:scale-110"
                      title="Mark this reminder as done"
                    />
                     <p>{reminder.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {petReminders.length === 0 &&
              allReminders.some((r) => r.petId?._id === id) && (
                <p className="text-sm text-black text-center bg-white/40 rounded p-1">
                  ✅ All reminders completed
                </p>
              )}

            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
              <button
                onClick={() => setShowReminder(true)}
                className="px-3 py-1 bg-yellow-400 text-white text-sm rounded-md hover:bg-yellow-600"
              >
                Set Reminder
              </button>
              <button
                onClick={() => setShowUpdate(true)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-700"
              >
                Update
              </button>
              <button
                onClick={deletePet}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {showUpdate && (
        <UpdatePet
          isOpen={showUpdate}
          onClose={() => setShowUpdate(false)}
          pet={{ id, name, type, age, breed }}
          onUpdate={onUpdate}
        />
      )}

      {showReminder && (
        <Reminder
          isOpen={showReminder}
          onClose={() => setShowReminder(false)}
          petId={id}
          
        />
      )}
    </>
  );
}

export default PetsCard;
