import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import CartIcon from "../assets/Images/cart.png";
import axios from "axios";
// import Serach from "../assets/Images/s.png";
import { motion, AnimatePresence } from "framer-motion";

function ProductPage() {
  // const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [store, setStore] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [showAllSimilar, setShowAllSimilar] = useState(false);

  const { _id, name, description, price, quantity, rating, image, category } =
    location.state || {};

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

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

  const getFood = async () => {
    try {
      const res = await axios.get("https://furgetnot.onrender.com/api/food/all", {
        withCredentials: true,
      });
      setStore(res.data.foodList);
    } catch (error) {
      console.log(error);
    }
  };
  // const filteredStore = store.filter((item) =>
  //   item.name.toLowerCase().includes(search.toLowerCase())
  // );

  useEffect(() => {
    getFood();
  }, []);

  useEffect(() => {
    if (store.length > 0 && _id) {
      const similar = store.filter(
        (item) =>
          (item.category === category ||
            item.name.includes(name.split(" ")[0])) &&
          item._id !== _id
      );
      setSimilarProducts(similar);

      const top = [...store].sort((a, b) => b.rating - a.rating).slice(0, 4);
      setTopProducts(top);
    }
  }, [store, _id, category, name]);

  const originalPrice = Math.max(price * 3, price + 200);

  const renderProductCard = (item) => {
    const origPrice = Math.max(item.price * 3, item.price + 200);
    return (
      <div
        key={item._id}
        className="bg-white shadow rounded-lg p-4 cursor-pointer flex flex-col justify-between h-[320px] w-full"
        onClick={() => navigate("/product/detailed", { state: item })}
      >
        <img
          src={item.image}
          alt={item.name}
          className="rounded mb-3 h-40 md:w-25 w-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {item.description}
          </p>
          <p className="font-bold text-green-600">
            ₹{item.price}{" "}
            <span className="text-red-500 text-sm line-through ml-2">
              ₹{origPrice}
            </span>
          </p>
          <span
            className={`font-semibold ${
              item.quantity < 1 ? "text-red-600" : "text-green-600"
            }`}
          >
            {item.quantity < 1 ? "(Out Of Stock)" : "(In Stock)"}
          </span>
          {item.quantity >= 1 && (
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
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="flex justify-end p-4">
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/checkout")}
        >
          <img src={CartIcon} alt="Cart" className="w-8 h-8" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-4xl mx-auto relative shadow-md p-3 flex flex-col md:flex-row text-white rounded-lg">
        <img
          src={image}
          alt={name}
          className="rounded-lg w-full md:w-1/2 object-cover p-6"
        />
        <div className="flex flex-col gap-1 p-3 rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold text-black">{name}</h1>
          <p className="text-black">{description}</p>
          <p className="font-bold text-green-600">
            ₹{price}{" "}
            <span className="text-red-500 text-sm line-through ml-2">
              ₹{originalPrice}
            </span>
          </p>
          <span
            className={`font-semibold ${
              quantity < 1 ? "text-red-600" : "text-green-600"
            }`}
          >
            {quantity < 1 ? "(Out Of Stock)" : "(In Stock)"}
          </span>
          <div className="text-yellow-500 text-lg flex items-center">
            {[...Array(5)].map((_, index) => {
              const fullStar = index + 1 <= Math.floor(rating);
              const halfStar =
                index + 1 === Math.ceil(rating) && !Number.isInteger(rating);
              return (
                <span key={index}>
                  {fullStar ? "★" : halfStar ? "⭐" : "☆"}
                </span>
              );
            })}
            <span className="ml-1 text-gray-600 text-sm">({rating})</span>
          </div>

          {quantity >= 1 && (
            <div className="flex gap-4 mt-4">
              <button
                onClick={() =>
                  handleAddToCart({ _id, name, price, image, quantity, rating })
                }
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add to Cart
              </button>
              <button
                onClick={() =>
                  handleBuy({ _id, name, price, image, quantity, rating })
                }
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
              >
                Buy Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Similar Products */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Similar Products</h2>
        <div className="grid md:grid-cols-4 grid-cols-3 gap-4">
          {(showAllSimilar ? similarProducts : similarProducts.slice(0, 6)).map(
            renderProductCard
          )}
        </div>
        {similarProducts.length > 6 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAllSimilar(!showAllSimilar)}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              {showAllSimilar ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>

      {/* Top Products */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Top Products</h2>
        <div className="grid md:grid-cols-4 grid-cols-3 gap-4">
          {topProducts.map(renderProductCard)}
        </div>
      </div>

      {/* Floating Cart */}
      {cartItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-3 rounded-4xl shadow-lg flex items-center gap-4 z-50"
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

export default ProductPage;
