import React, { useEffect, useState } from "react";
import axios from "axios";
import PetsCard from "../../components/PetsCard";
import AddPets from "../../components/AddPets";
import Lottie from "lottie-react";
import Header from "../../components/Header";
import lottiefile2 from "../../assets/aminmation/landing_animation.json";

function Home() {
  const [showAddPetModal, setshowAddPetModal] = useState(false);
  const [pets, setPets] = useState([]);
 

  // 🔽 Fetch pets from API
  useEffect(() => {
    const body = document.body;
    body.style.backgroundColor = "#fff7ed";
    const fetchPets = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/pets/getallpets",
          {
            withCredentials: true,
          }
        );
        setPets(res.data.pets);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, [showAddPetModal]); // 🔁 re-fetch when modal closes after adding

  const handleDelete = (id) => {
    setPets((prevPets) => prevPets.filter((pet) => pet._id !== id));
  };
  const handleUpdate = (updatedPet) => {
    setPets((prevPets) =>
      prevPets.map((pet) => (pet._id === updatedPet._id ? updatedPet : pet))
    );
  };

 
  return (
    <>
      <Header/>

      <div className="pl-3 pt-5">
        <button
          onClick={() => setshowAddPetModal(true)}
          className="border-none bg-orange-300 h-10 w-35 text-amber-950 font-semibold rounded-2xl p-2 text-center hover:bg-black hover:text-white transition-all duration-300 focus:outline-none hover:shadow-2xs"
        >
          Add Your Pet 🐾
        </button>
      </div>
      <AddPets
        isOpen={showAddPetModal}
        onClose={() => setshowAddPetModal(false)}
      />

      {/* ✅ Render list of pet cards */}
      <div className="flex flex-wrap gap-4 p-4">
        {pets.map((pet) => (
          <PetsCard
            key={pet._id}
            id={pet._id}
            name={pet.name}
            type={pet.type}
            age={pet.age}
            breed={pet.breed}
            image={pet.image}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
      {/* Lottie animation */}
      <div className="fixed bottom-20 -right-8 md:w-40 md:h-40 z-50 w-30 h-30">
        <Lottie
          animationData={lottiefile2}
          loop
          autoplay
          className="w-full h-full"
        />
      </div>
    </>
  );
}

export default Home;
