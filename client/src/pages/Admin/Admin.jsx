import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import UpdateUser from "../../components/UpdateUser";

function Admin() {
  const [pet, setPet] = useState([]);
  const [user, setUser] = useState([]);
  const [showAllPet, setShowAllPet] = useState(true);
  const [showAllUser, setShowAllUser] = useState(false);
  const [storeData, setStoreData] = useState([]);
  const [cart, setCart] = useState([]);
  const [showStore, setShowStore] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [order, setOrder] = useState([]);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // 🆕 Add a state for the user to be updated

  useEffect(() => {
    getAllPet();
    getAllUser();
    fetchStoreData();
    fetchOrders();
  }, []);

  const getAllPet = async () => {
    try {
      const res = await axios.get("https://furgetnot.onrender.com/api/admin/gettpet", {
        withCredentials: true,
      });
      setPet(res.data.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const getAllUser = async () => {
    try {
      const res = await axios.get("https://furgetnot.onrender.com/api/admin/alluser", {
        withCredentials: true,
      });
      setUser(res.data.users);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const fetchStoreData = async () => {
    try {
      const res = await axios.get("https://furgetnot.onrender.com/api/food/all", {
        withCredentials: true,
      });
      setStoreData(res.data.foodList);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const addToCart = (item) => {
    const exists = cart.find((i) => i._id === item._id);
    if (exists) {
      setCart(
        cart.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://furgetnot.onrender.com/api/admin/orders/status",
        { withCredentials: true }
      );
      setOrder(res.data.orders || []);
    } catch (error) {
      console.error("Failed to fetch deliveries:", error);
    }
  };

  // ✅ Delete PET
  const handleDeletePet = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;
    try {
      await axios.delete(`https://furgetnot.onrender.com/api/admin/pet/${id}`, {
        withCredentials: true,
      });
      setPet((prev) => prev.filter((p) => p._id !== id));
      toast.success("Pet deleted");
    } catch (error) {
      console.error(
        "Failed to delete pet:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to delete pet");
    }
  };

  // ✅ Delete USER (fixed)
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      // If your backend route is /user/delete/:id, replace the URL below accordingly.
      await axios.delete(`https://furgetnot.onrender.com/api/admin/user/delete/${id}`, {
        withCredentials: true,
      });
      setUser((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch (error) {
      console.error(
        "Failed to delete user:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  // 🆕 Function to handle opening the update modal
  const handleUpdateUserClick = (userToUpdate) => {
    setSelectedUser(userToUpdate);
    setshowUpdateModal(true);
  };

  // 🆕 Function to handle updating the user list after a successful update
  const handleUserUpdate = (updatedUser) => {
    setUser((prevUsers) =>
      prevUsers.map((u) => (u._id === updatedUser._id ? updatedUser : u))
    );
  };

  const handleProductDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const res = await axios.delete(
        `https://furgetnot.onrender.com/api/food/product/${id}`,
        {
          withCredentials: true,
        }
      );
      // ✅ This is the key part to update the state immediately
      setStoreData((prev) => prev.filter((p) => p._id !== id));
      toast.success(res.data.message || "Product deleted successfully.");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <>
      <Header />
      <div className="flex overflow-x-scroll whitespace-nowrap gap-2 mt-1 md:justify-start px-2">
        <button
          onClick={() => {
            setShowAllPet(true);
            setShowAllUser(false);
            setShowStore(false);
            setShowProduct(false);
          }}
          className="relative bg-orange-200 text-black font-bold px-4 py-2 rounded-2xl mt-2 ml-2 cursor-pointer"
        >
          All Pets
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {pet.length}
          </span>
        </button>

        <button
          onClick={() => {
            setShowAllUser(true);
            setShowAllPet(false);
            setShowStore(false);
            setShowProduct(false);
          }}
          className="bg-orange-200 text-black font-bold p-2 rounded-2xl mt-2 ml-2 cursor-pointer relative"
        >
          All Users
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {user.length}
          </span>
        </button>

        <button
          onClick={() => {
            setShowAllUser(false);
            setShowAllPet(false);
            setShowStore(false);
            setShowProduct(true);
          }}
          className="bg-orange-200 text-black font-bold p-2 rounded-2xl mt-2 ml-2 cursor-pointer relative"
        >
          All Deliveries
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {order.length}
          </span>
        </button>

        <Link
          to="/addpetfood"
          className="bg-orange-200 text-black font-bold p-2 rounded-2xl mt-2 ml-2 cursor-pointer"
        >
          Add Pet Food
        </Link>

        <button
          onClick={() => {
            setShowAllUser(false);
            setShowAllPet(false);
            setShowStore(true);
            setShowProduct(false);
          }}
          className="bg-orange-200 text-black font-bold p-2 rounded-2xl mt-2 ml-2 cursor-pointer"
        >
          Store
        </button>
      </div>

      {showAllPet && (
        <div className="p-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Image
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Type
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Breed
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Age
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Owner Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Owner Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pet.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">
                    {item.image ? (
                      <img
                        src={`https://furgetnot.onrender.com/uploads/${
                          item.image
                        }?${Date.now()}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded transition-transform duration-200 hover:scale-150"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 capitalize text-gray-800 font-medium">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{item.type}</td>
                  <td className="px-4 py-2 text-gray-600">{item.breed}</td>
                  <td className="px-4 py-2 text-gray-600">{item.age} years</td>
                  <td className="px-4 py-2 text-gray-600 capitalize">
                    {item.ownerId?.name || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {item.ownerId?.email || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeletePet(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAllUser && (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {user.map((u) => (
            <div key={u._id} className="bg-white p-1">
              <table className="min-w-full border border-gray-300 rounded-lg shadow-sm bg-white">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="text-left py-2 px-4 border-b">Field</th>
                    <th className="text-left py-2 px-4 border-b">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b font-medium">Name</td>
                    <td className="py-2 px-4 border-b capitalize">{u.name}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b font-medium">Email</td>
                    <td className="py-2 px-4 border-b">{u.email}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b font-medium">Joined</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b font-medium">Action</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleUpdateUserClick(u)} // 🎯 Pass the whole user object
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded ml-2"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {showStore && (
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {storeData.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded mb-3 md:h-50 md:w-40 md:ml-13 transition-transform duration-200 hover:scale-150"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <p className="font-bold text-green-600 mb-2">₹{item.price}</p>
              <span
                className={`font-semibold ${
                  item.quantity < 10 ? "text-red-600" : "text-green-600"
                }`}
              >
                {item.quantity}{" "}
                {item.quantity < 10 ? "(Out Of Stock)" : "(In Stock)"}
              </span>
              <button
                onClick={() => handleProductDelete(item._id)}
                className="bg-red-500 p-2 rounded-2xl text-white"
              >
                Delete
              </button>
              <div className="text-yellow-500 text-sm flex items-center">
                {[...Array(5)].map((_, index) => {
                  const fullStar = index + 1 <= Math.floor(item.rating);
                  const halfStar =
                    index + 1 === Math.ceil(item.rating) &&
                    !Number.isInteger(item.rating);
                  return (
                    <span key={index}>
                      {fullStar ? "★" : halfStar ? "⭐" : "☆"}
                    </span>
                  );
                })}
                <span className="ml-1 text-gray-600 text-xs">
                  ({item.rating})
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showProduct && (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {order.map((order) => (
            <div key={order._id} className="bg-white shadow-md rounded-lg p-4">
              <div className="mb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  Order ID: {order._id}
                </h2>
                <p className="text-sm text-gray-500">
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold">Customer Info:</h3>
                <p className="text-sm text-gray-700 capitalize">
                  👤 {order.customer.name}
                </p>
                <p className="text-sm text-gray-700">
                  📞 {order.customer.number}
                </p>
                <p className="text-sm text-gray-700">
                  📧 {order.customer.email}
                </p>
                <p className="text-sm text-gray-700">
                  🏠 {order.customer.address}, {order.customer.city} -{" "}
                  {order.customer.pincode}
                </p>
                <p className="text-sm text-gray-700">
                  Payment Mode: {order.paymentType || "N/A"}
                </p>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold">Items:</h3>
                {order.cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-sm text-gray-600 flex justify-between items-center mb-2 border p-2 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <div className="text-green-600 font-medium">
                      ₹{item.price * item.qty}
                    </div>
                  </div>
                ))}
              </div>

              <div className="font-bold text-lg text-right text-green-700">
                Total: ₹{order.totalAmount}
              </div>
              <div className="mt-2 text-sm">
                <span
                  className={`px-2 py-1 rounded-full font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : order.status === "processing"
                      ? "bg-blue-200 text-blue-800"
                      : order.status === "delivered"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {showUpdateModal &&
        selectedUser && ( // 🎯 Check if selectedUser exists before rendering
          <UpdateUser
            isOpen={showUpdateModal}
            onClose={() => setshowUpdateModal(false)}
            user={selectedUser} // 🎯 Pass the selected user object
            onUpdate={handleUserUpdate} // 🆕 Pass the update handler
          />
        )}
    </>
  );
}

export default Admin;
