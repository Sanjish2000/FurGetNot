import React, { useState } from "react";
// import img from "../assets/Images/dog_example.jpg"
// import img2 from "../assets/Images/dog_example.png"
import "../pages/Auth/modal.css"; // ✅ optional, if using animation
import axios from "axios";
import toast from "react-hot-toast";
import UpdatePet from "./UpdatePet";

function PetsCard({ id, name, type, age, breed, image,onDelete,onUpdate  }) {
   const [showUpdate, setShowUpdate] = useState(false);
    // const [pets, setPets] = useState([]);
    
  const deletPet = async () => {
    try {
      const res = await axios.delete(` https://furgetnot.onrender.com/api/pets/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          onDelete(id);
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }; 
  //  const handleupdate = (id) => {
  //   setPets(prevPets => prevPets.filter(pet => pet._id !== id));
  //  }
  
  
  return (
    <>
      <div className="w-full md:w-1/4 md:ml-15 bg-orange-50 rounded-2xl shadow-lg overflow-hidden mt-5 ml-1 flex-wrap modal-animation">
        <div className="relative w-full h-80 ">
          <img
            src={` https://furgetnot.onrender.com/${image}?${Date.now()}`} // ✅ use dynamic image
            alt={name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-evenly gap-16 text-white p-3">
            <div>
              <h2 className="text-2xl font-bold mb-1">{name}</h2>
              <p className="text-sm">Type: {type}</p>
            </div>
            <div>
              <p className="text-sm">Age: {age} Years</p>
              <p className="text-sm">Breed: {breed}</p>
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 pl-20 ">
              <button className="px-3 py-1 bg-yellow-400 text-white text-sm rounded-md cursor-pointer hover:bg-yellow-600">
                Set Reminder
              </button>
              <button
              onClick={() => setShowUpdate(true)} className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md cursor-pointer hover:bg-blue-700">
                Update
              </button>
              <button
                onClick={deletPet}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded-md cursor-pointer hover:bg-red-800 "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Update Modal */}
       {showUpdate && (
          <UpdatePet
          isOpen={showUpdate}
          onClose={() => setShowUpdate(false)}
          pet={{ id, name, type, age, breed  }}
          onUpdate={onUpdate} 
        />
      )}
    </>
  );
}
export default PetsCard;
