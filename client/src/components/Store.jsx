// Store.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Serach from "../assets/Images/s.png";
import Cart from "../assets/Images/cart.png";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Store() {
  const [store, setStore] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Cart initialized from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const navigate = useNavigate();

  const getStore = async () => {
    try {
      const res = await axios.get("https://furgetnot.onrender.com/api/food/all", {
        withCredentials: true,
      });
      setStore(res.data.foodList);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getStore();
  }, []);

  // 🔍 Filtered data
  const filteredStore = store.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Cart Handlers
  const updateCart = (updated) => {
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const handleAddToCart = (item) => {
    updateCart([...cartItems, item]);
  };

  const handleBuy = (item) => {
    handleAddToCart(item);
    navigate("/checkout");
  };

  return (
    <>
      <Header />

      {/* 🔍 Search & Cart Icon */}
      <div className="flex justify-center items-center gap-5 md:flex md:justify-start md:pl-2">
        <div className="flex items-center justify-center gap-2 p-4 border-1 rounded-3xl w-100% h-12 mt-2 w-70 md:w-125">
          <input
            className="p-2 border-none"
            type="text"
            placeholder="Search food..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <img src={Serach} alt="" className="w-6 h-6" />
        </div>
        <Link to="/checkout">
          <div className="relative cursor-pointer">
            <img src={Cart} alt="Cart" className="w-7 h-7" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* 🛒 Products Grid */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredStore.map((item) => {
          const originalPrice = Math.max(item.price * 3, item.price + 200);

          return (
            <div
              key={item._id}
              className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
              onClick={() => navigate("/product/detailed", { state: item })}
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
              <p className="font-bold text-green-600 mb-2">
                ₹{item.price}{" "}
                <span className="text-red-500 text-sm line-through ml-2">
                  ₹{originalPrice}
                </span>
              </p>
              <span
                className={`font-semibold ${
                  item.quantity < 10 ? "text-red-600" : "text-green-600"
                }`}
              >
                {item.quantity < 10 ? "(Out Of Stock)" : "(In Stock)"}
              </span>

              {/* ⭐ Rating Display */}
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

              {/* 🛒 Add + Buy Buttons */}
              {item.quantity > 0 && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                    className="text-sm px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuy(item);
                    }}
                    className="text-sm px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white"
                  >
                    Buy
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 🟢 Floating Cart (animated like ProductPage) */}
      {cartItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-3 rounded-4xl shadow-lg flex items-center gap-4 z-50 overflow-x-auto max-w-[95vw]"
        >
          <AnimatePresence>
            {cartItems.map((item, index) => (
              <motion.img
                key={item._id || index}
                src={item.image}
                alt={item.name}
                className="w-10 h-10 object-cover rounded-3xl"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              />
            ))}
          </AnimatePresence>

          <button
            onClick={() => navigate("/checkout")}
            className="ml-auto text-white font-semibold px-3 py-1 rounded hover:bg-green-700"
          >
            →
          </button>
        </motion.div>
      )}
    </>
  );
}

export default Store;
