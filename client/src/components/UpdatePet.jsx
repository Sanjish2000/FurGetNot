import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../pages/Auth/modal.css";

function UpdatePet({ isOpen, onClose, pet, onUpdate }) {
  const [formData, setFormData] = useState({
    name: pet.name || "",
    type: pet.type || "",
    age: pet.age || "",
    breed: pet.breed || "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("type", formData.type);
      form.append("age", formData.age);
      form.append("breed", formData.breed);
      if (formData.image) form.append("image", formData.image);

      const res = await axios.put(
        `https://furgetnot.onrender.com/api/pets/update/${pet.id}`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        onUpdate(res.data.pet); // ✅ sending updated pet back to parent
        onClose(); // ✅ close modal
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  if (!isOpen) return null;

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
          Update Pet
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Pet name"
            className="border rounded-lg px-4 py-2"
            required
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
          >
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Cow">Cow</option>
            <option value="Rabbit">Rabbit</option>
          </select>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="border rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Breed"
            className="border rounded-lg px-4 py-2"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            accept="image/*"
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

export default UpdatePet;
