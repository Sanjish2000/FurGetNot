import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import toast from "react-hot-toast";

const AddPetFood = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "", // ⬅️ Added quantity
    image: null, // ⬅️ File (not string)
    type: "dog", // ⬅️ default value
    available: true,
    rating: "",
  });

  // ✅ handleChange updated for file inputs
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(); // ✅ Use FormData
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("quantity", formData.quantity); // ⬅️ append quantity
      data.append("type", formData.type);
      data.append("available", formData.available);
      data.append("rating", formData.rating);
      if (formData.image) {
        data.append("image", formData.image); // ✅ append file
      }

      const res = await axios.post("http://localhost:5000/api/food/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success(res.data.message);

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        image: null,
        type: "dog",
        available: true,
        rating: "",
      });
    } catch (error) {
      console.error("Error adding pet food:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {" "}
      <Header />
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg mt-5 md:w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Pet Food</h2>
        <form onSubmit={handleSubmit}>
          <table className="w-full table-auto border border-gray-300 rounded-md overflow-hidden">
            <tbody className="divide-y divide-gray-200">
              {/* Name */}
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-700 w-1/4">Name</td>
                <td className="p-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </td>
              </tr>

              {/* Description */}
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-700">Description</td>
                <td className="p-3">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </td>
              </tr>

              {/* Price */}
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-700">Price (₹)</td>
                <td className="p-3">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </td>
              </tr>

              {/* Image */}
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-700">Image</td>
                <td className="p-3">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </td>
              </tr>

              {/* Type */}
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-700">Type</td>
                <td className="p-3">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="cow">Cow</option>
                  </select>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-700">Quantity</td>
                <td className="p-3">
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="0"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </td>
              </tr>

              {/* Rating */}
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-700">Rating (0–5)</td>
                <td className="p-3">
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </td>
              </tr>

              {/* Available */}
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-700">Available</td>
                <td className="p-3">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="available"
                      checked={formData.available}
                      onChange={handleChange}
                      className="form-checkbox h-5 w-5 text-green-600"
                    />
                    <span className="text-gray-600">In Stock</span>
                  </label>
                </td>
              </tr>

              {/* Submit */}
              <tr>
                <td colSpan="2" className="p-3 text-center">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                  >
                    Add Pet Food
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};

export default AddPetFood;
