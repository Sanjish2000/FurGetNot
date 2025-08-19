import React, { useEffect, useState } from "react";
import axios from "axios";
import PetsCard from "../../components/PetsCard";
import AddPets from "../../components/AddPets";
import Lottie from "lottie-react";
import Header from "../../components/Header";
import lottiefile2 from "../../assets/aminmation/landing_animation.json";
import { useNavigate } from "react-router-dom";
import Store from "../../components/Store";

function Home() {
  const [showAddPetModal, setshowAddPetModal] = useState(false);
  const [pets, setPets] = useState([]);
  const [showStore, setShowStore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      navigate("/admin");
    }
  }, []);

  useEffect(() => {
    const body = document.body;
    body.style.backgroundColor = "#fff7ed";
    const fetchPets = async () => {
      try {
        const res = await axios.get(
          "https://furgetnot.onrender.com/api/pets/getallpets",
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
  }, [showAddPetModal]);

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
      <Header />

      <div className="flex flex-col justify-evenly gap-3 pt-4 items-center md:flex md:flex-row md:justify-start md:pl-2">
        <div className="flex flex-row justify-evenly gap-2 md:gap-3">
          <button
            onClick={() => setshowAddPetModal(true)}
            className="border-none bg-orange-300 h-13 w-45 text-amber-950 font-semibold rounded-2xl p-2 text-center hover:bg-black hover:text-white transition-all duration-300 focus:outline-none hover:shadow-2xs"
          >
            Add Your Pet🐾
          </button>

          <button
            onClick={() =>navigate("/store")}
            className="border-none bg-orange-300 h-13 w-45 text-amber-950 font-semibold rounded-2xl p-2 text-center hover:bg-black hover:text-white transition-all duration-300 focus:outline-none hover:shadow-2xs"
          >
            Pet Food Store 🛒
          </button>
        </div>

        <div className="flex flex-row justify-evenly gap-2 md:gap-3">
          <button
          onClick={()=>navigate("/contact")} 
          className="border-none bg-orange-300 h-13 w-45 text-amber-950 font-semibold rounded-2xl p-2 text-center hover:bg-black hover:text-white transition-all duration-300 focus:outline-none hover:shadow-2xs">
            Contact Us 📞
          </button>
          <button
          onClick={()=>navigate("/vetclinic")}
          className="border-none bg-orange-300 h-13 w-45 text-amber-950 font-semibold rounded-2xl p-2 text-center hover:bg-black hover:text-white transition-all duration-300 focus:outline-none hover:shadow-2xs">
            Vet Clinik 💉
          </button>
        </div>
      </div>

      {/* ✅ Show Store Component */}
      {/* {showStore && navigate("/store")} */}

      {/* ✅ Add Pet Modal */}
      <AddPets
        isOpen={showAddPetModal}
        onClose={() => setshowAddPetModal(false)}
      />

      {/* ✅ List of Pet Cards */}
      {!showStore && (
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
      )}

      {/* ✅ Lottie Animation */}
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
