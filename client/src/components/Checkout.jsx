// Checkout.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import toast from "react-hot-toast";

function Checkout() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart).map(item => ({ ...item, qty: item.qty || 1 })) : [];
  });

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    pincode: "",
    city: "",
    number: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    const orderData = {
      ...customerDetails,
      cart: cartItems.map(item => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        image: item.image,
      })),
      totalAmount: calculateTotalAmount(),
    };

    localStorage.setItem("tempOrder", JSON.stringify(orderData));
    navigate("/checkout/process-to-pay");
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">
            Your cart is empty. Go back to{" "}
            <Link to="/store" className="text-white bg-blue-500 p-2 rounded-xl hover:underline border-1 text-lg ">
              store
            </Link>{" "}
            to add items.
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center bg-white shadow rounded-lg p-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-t border-b border-gray-300">{item.qty}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, 1)}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-lg font-bold ">₹{item.price * item.qty}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white shadow rounded-lg">
              <h3 className="text-xl font-bold mb-4">Total: ₹{calculateTotalAmount()}</h3>
              <h3 className="text-xl font-bold mb-4">Shipping Details</h3>

              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerDetails.name}
                    onChange={handleCustomerDetailsChange}
                    required
                    className="shadow border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                    Address:
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleCustomerDetailsChange}
                    required
                    className="shadow border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pincode" className="block text-gray-700 text-sm font-bold mb-2">
                      Pincode:
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={customerDetails.pincode}
                      onChange={handleCustomerDetailsChange}
                      required
                      className="shadow border rounded w-full py-2 px-3 text-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                      City:
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={customerDetails.city}
                      onChange={handleCustomerDetailsChange}
                      required
                      className="shadow border rounded w-full py-2 px-3 text-gray-700"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="number" className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    id="number"
                    name="number"
                    value={customerDetails.number}
                    onChange={handleCustomerDetailsChange}
                    required
                    className="shadow border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={customerDetails.email}
                    onChange={handleCustomerDetailsChange}
                    required
                    className="shadow border rounded w-full py-2 px-3 text-gray-700"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Continue to Payment
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Checkout;
